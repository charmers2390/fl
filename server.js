const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static('.'));
app.use('/uploads', express.static('uploads'));

app.get('/videos', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    if (err) return res.status(500).send('Failed to load video list');
    res.json(files);
  });
});

app.post('/upload', upload.single('video'), (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`🔥 Flame is live at http://localhost:${PORT}`);
});
