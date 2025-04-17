const path = require('path');
const fs = require('fs');


// Upload Controller
exports.uploadNote = async (req, res) => {
  try {
    console.log(req.file);
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded' 
      });
    }

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        name: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`,
        mimetype: req.file.mimetype
      }
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during upload'
    });
  }
};

// Download Controller
exports.downloadNote = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'uploads', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ 
        success: false,
        error: 'File not found' 
      });
    }

    // Set appropriate headers
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Create read stream and pipe to response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    // Handle stream errors
    fileStream.on('error', (err) => {
      console.error('File stream error:', err);
      res.status(500).json({
        success: false,
        error: 'Error streaming file'
      });
    });

  } catch (err) {
    console.error('Download error:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during download'
    });
  }
};

// Delete Controller (optional)
exports.deleteNote = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'uploads', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ 
        success: false,
        error: 'File not found' 
      });
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Delete error:', err);
        return res.status(500).json({
          success: false,
          error: 'Failed to delete file'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'File deleted successfully'
      });
    });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during deletion'
    });
  }
};