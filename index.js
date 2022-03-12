const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const app = express();

// const upload = multer({ dest: 'uploads/' });

// app.post('/upload', upload.single('file'), (req, res) => {
//   res.json({
//     status: 'success',
//   });
// });

// app.post('/upload', upload.array('file', 3), (req, res) => {
//   res.json({
//     status: 'success',
//   });
// });

// const multiUpload = upload.fields([
//   { name: 'avatar', maxCount: 1 },
//   { name: 'resume', maxCount: 1 },
// ]);

// app.post('/upload', multiUpload, (req, res) => {
//   res.json({
//     status: 'success',
//   });
// });

//custom file name

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new Error('Wring file type'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10000000 } });
app.post('/upload', upload.array('file'), (req, res) => {
  res.json({
    status: 'success',
  });
});

app.listen(4000, () => console.log('listening on port 4000'));
