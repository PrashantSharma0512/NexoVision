import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const FaceAttendance = () => {
  const webcamRef = useRef(null);
  const [result, setResult] = useState('');

  const captureAndRecognize = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64Data = imageSrc?.split(',')[1];

    if (!base64Data) return alert('No image captured');

    try {
      const res = await axios.post('/api/attendance/recognize', {
        imageBase64: base64Data,
      });
      setResult(res.data.message + (res.data.name ? ` (${res.data.name})` : ''));
    } catch (err) {
      setResult(err.response?.data?.message || 'Recognition failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        width={300}
        height={300}
        className="rounded shadow"
      />
      <button
        onClick={captureAndRecognize}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Recognize & Mark Attendance
      </button>
      {result && <p className="mt-4 text-green-800 text-lg">{result}</p>}
    </div>
  );
};

export default FaceAttendance;
