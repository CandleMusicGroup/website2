const express = require('express');
const router = express.Router();
const multer = require('multer');
const trackController = require('../controllers/trackController');
const authMiddleware = require('../middlewares/authMiddleware');
const path = require('path');

// Multer ayarları
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Token doğrulaması gerektiren rotalar
router.post('/upload', authMiddleware, upload.single('musicFile'), trackController.uploadTrack);
router.get('/', authMiddleware, trackController.getTracks);

module.exports = router;