const express = require('express');
const multer = require('multer');
const { s3Uploadv2 } = require('./s3Service');
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

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads');
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${uuid().slice(1, 5)}-${originalname}`);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 1000000000, files: 2 } });

app.post('/upload', upload.array('file'), async (req, res) => {
  try {
    const results = await s3Uploadv2(req.files);
    res.json({
      status: 'success',
      results,
    });
  } catch (error) {
    console.log(error);
  }
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.json({
        status: 400,
        message: 'file is too large',
      });
    }

    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.json({
        status: 400,
        message: 'file limit reached',
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.json({
        status: 400,
        message: 'file must be an image',
      });
    }
  }
});

app.listen(4000, () => console.log('listening'));
