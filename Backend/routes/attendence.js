const express = require('express');
const router = express.Router();
const { registerFace, recognizeFace } = require('../controllers/faceControllers');

router.post('/register', registerFace);
router.post('/recognize', recognizeFace);

module.exports = router;
