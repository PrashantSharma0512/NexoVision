const path = require('path');
const fs = require('fs');

// Upload Controller
exports.uploadNote = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  return res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file.filename,
    path: `/uploads/${req.file.filename}`
  });
};

// Download Controller
exports.downloadNote = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'uploads', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).json({ error: 'File not found' });

    res.download(filePath, filename, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to download file' });
      }
    });
  });
};
