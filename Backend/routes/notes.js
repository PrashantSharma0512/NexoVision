const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadNote, downloadNote } = require('../controllers/notesController');

// Upload Route
router.post('/upload', upload.single('note'), uploadNote);

// Download Route
router.get('/download/:filename', downloadNote);

module.exports = router;