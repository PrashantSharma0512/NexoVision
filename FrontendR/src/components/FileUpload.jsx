import { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('note', file);

    try {
      const res = await axios.post('/api/notes/upload', formData);
      onUpload(res.data.file); // trigger refresh
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded mb-6">
      <h2 className="text-xl font-semibold mb-2">Upload a Note</h2>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <br />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default FileUpload;
