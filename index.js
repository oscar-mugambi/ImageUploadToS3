const express = require('express');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const app = express();

const upload = multer({ dest: 'uploads/' });

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

multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename:(req,file,cb){
    cb(null, )
  }
});
const multiUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
]);

app.post('/upload', multiUpload, (req, res) => {
  res.json({
    status: 'success',
  });
});

app.listen(4000, () => console.log('listening on port 4000'));
