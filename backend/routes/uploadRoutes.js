const express = require('express');
const multer = require('multer');
const { format } = require('util');
const bucket = require('../config/gcs');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add a route to verify the route is being loaded
router.get('/test', (req, res) => {
  console.log('GET /api/upload/test hit');
  res.send('Upload route is working');
});

router.post('/upload', upload.single('file'), (req, res) => {
  console.log('POST /api/upload hit');  // Log request received

  if (!req.file) {
    console.log('No file uploaded');  // Log no file error
    return res.status(400).send('No file uploaded.');
  }

  const blob = bucket.file(`${Date.now().toString()}-${req.file.originalname}`);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', (err) => {
    console.log('Error uploading file:', err);  // Log upload error
    res.status(500).send(err);
  });

  blobStream.on('finish', () => {
    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    console.log('File uploaded successfully:', publicUrl);  // Log success
    res.status(200).send({ url: publicUrl });
  });

  blobStream.end(req.file.buffer);
});

module.exports = router;
