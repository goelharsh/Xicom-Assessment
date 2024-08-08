const express = require('express');
const router = express.Router();
const multer = require('multer');
const { submitDocument } = require('../controllers/User');
const path = require('path');

// Set up multer to handle multiple files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array('files'); // Use disk storage

// POST route for document submission
router.post('/submitDocument', upload, submitDocument);

module.exports = router;
