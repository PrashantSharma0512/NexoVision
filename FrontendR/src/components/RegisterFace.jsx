import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const RegisterFace = () => {
  const [name, setName] = useState('');
  const webcamRef = useRef(null);
  const [message, setMessage] = useState('');

  const captureAndRegister = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64Data = imageSrc?.split(',')[1];

    if (!name || !base64Data) return alert('Name or Image missing');

    try {
      const res = await axios.post('/api/attendance/register', {
        name,
        imageBase64: base64Data,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Register Your Face</h1>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        width={300}
        height={300}
        className="rounded shadow"
      />
      <input
        type="text"
        placeholder="Enter your name"
        className="mt-4 p-2 border rounded w-64"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={captureAndRegister}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Register Face
      </button>
      {message && <p className="mt-4 text-green-700">{message}</p>}
    </div>
  );
};

export default RegisterFace;
