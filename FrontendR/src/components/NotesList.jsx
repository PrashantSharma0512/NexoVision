import { useEffect, useState } from 'react';

const NotesList = ({ newFile }) => {
  const [notes, setNotes] = useState([]);

  // Fetch list from uploads folder (basic)
  const fetchNotes = async () => {
    try {
      const res = await fetch('/uploads');
      const html = await res.text();
      const files = Array.from(html.matchAll(/href="([^"]+\.(pdf|docx|txt))"/g)).map(
        (match) => match[1]
      );
      setNotes(files);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [newFile]);

  const handleDownload = (filename) => {
    window.location.href = `/api/notes/download/${filename}`;
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-2">Available Notes</h2>
      <ul>
        {notes.map((file, index) => {
          const filename = file.split('/').pop();
          return (
            <li key={index} className="flex justify-between items-center py-1">
              <span>{filename}</span>
              <button
                onClick={() => handleDownload(filename)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Download
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotesList;
