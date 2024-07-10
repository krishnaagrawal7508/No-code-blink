const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8000;

// Enable CORS
app.use(cors());

// Set up storage using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Save the file with a timestamp prefix
  },
});

const upload = multer({ storage });

// Create uploads directory if not exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Handle file upload
app.post('/upload', upload.single('coverImage'), (req, res) => {
  const { title, description } = req.body;
  res.send({
    message: 'File uploaded successfully',
    file: req.file,
    title: title,
    description: description,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
