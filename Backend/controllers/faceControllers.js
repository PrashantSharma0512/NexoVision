const axios = require('axios');
const mongoose = require('mongoose');
const Register = nosql.model('register');


const FACE_API = 'https://api-us.faceplusplus.com/facepp/v3';
const { FACEPP_API_KEY, FACEPP_API_SECRET, FACEPP_OUTER_ID } = process.env;

const registerFace = async (req, res) => {
  try {
    const { name, imageBase64 } = req.body;
    if (!name || !imageBase64) return res.status(400).json({ message: 'Missing fields' });

    // Detect face
    const detectRes = await axios.post(`${FACE_API}/detect`, null, {
      params: {
        api_key: FACEPP_API_KEY,
        api_secret: FACEPP_API_SECRET,
        image_base64: imageBase64,
      }
    });

    const face_token = detectRes.data.faces?.[0]?.face_token;
    if (!face_token) return res.status(400).json({ message: 'No face detected' });

    // Create user
    const user = await Register.create({ name, email: `${name}@faceapp.com`, phone: '', password: '', role: 'student' });

    // Add face to FaceSet
    const result = await axios.post(`${FACE_API}/faceset/addface`, null, {
      params: {
        api_key: FACEPP_API_KEY,
        api_secret: FACEPP_API_SECRET,
        outer_id: FACEPP_OUTER_ID,
        face_tokens: face_token,
      }
    });
console.log("------------------>",result);

    // Link user with face_token (could store in DB for future reference)
    user.face_token = face_token;
    await user.save();

    res.json({ message: 'Face registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const recognizeFace = async (req, res) => {
  try {
    const Attendance = nosql.model('attendence')
    const { imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ message: 'No image provided' });

    const searchRes = await axios.post(`${FACE_API}/search`, null, {
      params: {
        api_key: FACEPP_API_KEY,
        api_secret: FACEPP_API_SECRET,
        image_base64: imageBase64,
        outer_id: FACEPP_OUTER_ID
      }
    });

    const token = searchRes.data?.results?.[0]?.face_token;
    if (!token || searchRes.data.results[0].confidence < 80) {
      return res.status(401).json({ message: 'Face not recognized' });
    }

    const user = await Register.findOne({ face_token: token });
    if (!user) return res.status(404).json({ message: 'No user found' });

    // Mark attendance
    const today = new Date();
    const alreadyMarked = await Attendance.findOne({
      rollno: user._id,
      date: { $gte: new Date(today.setHours(0, 0, 0, 0)) },
    });

    if (alreadyMarked) {
      return res.json({ message: 'Attendance already marked', name: user.name });
    }

    await Attendance.create({
      rollno: user._id,
      date: new Date(),
      status: 'present'
    });

    res.json({ message: 'Attendance marked', name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Recognition error' });
  }
};

module.exports = { registerFace, recognizeFace };
