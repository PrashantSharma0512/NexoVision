const axios = require('axios');
const mongoose = require('mongoose');
const Register = nosql.model('register');


const FACE_API = 'https://api-us.faceplusplus.com/facepp/v3';
const { FACEPP_API_KEY, FACEPP_API_SECRET, FACEPP_OUTER_ID } = process.env;

const registerFace = async (req, res) => {
  try {
    const { name, imageBase64 , password} = req.body;
    if (!name || !imageBase64) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    console.log("📸 Starting face detection...");

    // Prepare form data
    const formData = new URLSearchParams();
    formData.append('api_key', FACEPP_API_KEY);
    formData.append('api_secret', FACEPP_API_SECRET);
    formData.append('image_base64', imageBase64);

    // Detect face
    const detectRes = await axios.post(`${FACE_API}/detect`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log("✅ Face detection response:", detectRes.data);

    const face_token = detectRes.data.faces?.[0]?.face_token;
    if (!face_token) {
      return res.status(400).json({ message: 'No face detected' });
    }
const FaceSchema = nosql.model('FaceSchema');
    // Create user
    const user = await FaceSchema.create({
      name,
      faceToken : face_token
    });

    // Prepare form data for FaceSet
    const addFaceData = new URLSearchParams();
    addFaceData.append('api_key', FACEPP_API_KEY);
    addFaceData.append('api_secret', FACEPP_API_SECRET);
    addFaceData.append('outer_id', FACEPP_OUTER_ID);
    addFaceData.append('face_tokens', face_token);

    // Add face to FaceSet
    const result = await axios.post(`${FACE_API}/faceset/addface`, addFaceData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log("✅ Add face to FaceSet response:", result.data);

    res.json({ message: 'Face registered successfully', userId: user._id });
  } catch (err) {
    console.error("❌ Error in registerFace:", err.response?.data || err.message);
    res.status(500).json({ message: err.response?.data?.error_message || err.message });
  }
};

const recognizeFace = async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ message: 'No image provided' });
    }

    console.log("📸 Starting face recognition...");

    // Prepare form data for Face search
    const formData = new URLSearchParams();
    formData.append('api_key', FACEPP_API_KEY);
    formData.append('api_secret', FACEPP_API_SECRET);
    formData.append('image_base64', imageBase64);
    formData.append('outer_id', FACEPP_OUTER_ID);

    // Search face
    const searchRes = await axios.post(`${FACE_API}/search`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log("✅ Face recognition response:", searchRes.data);

    const token = searchRes.data?.results?.[0]?.face_token;
    if (!token || searchRes.data.results[0].confidence < 80) {
      return res.status(401).json({ message: 'Face not recognized' });
    }
    const FaceSchema = nosql.model('FaceSchema');
    const user = await FaceSchema.findOne({ faceToken: token });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this face' });
    }
const Attendance = nosql.model('attendence');
    // Mark attendance
    const today = new Date();
    const alreadyMarked = await Attendance.findOne({
      rollno: user._id,
      date: { $gte: new Date(today.setHours(0, 0, 0, 0)) },
    });

    if (alreadyMarked) {
      return res.json({ message: 'Attendance already marked', name: user.name });
    }

    // Create attendance record
    await Attendance.create({
      rollno: user._id,
      date: new Date(),
      status: 'present',
    });

    res.json({ message: 'Attendance marked successfully', name: user.name });
  } catch (err) {
    // console.error("❌ Error in recognizeFace:", err.response?.data || err.message);
    res.status(500).json({ message: err.response?.data?.error_message || err.message });
  }
};


module.exports = { registerFace, recognizeFace };
