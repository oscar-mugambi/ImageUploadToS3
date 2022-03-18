require('dotenv').config();
const { S3 } = require('aws-sdk');
const uuid = require('uuid').v4;

exports.s3Uploadv2 = async (files) => {
  const s3 = new S3();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  const results = await Promise.all(params.map((param) => s3.upload(param).promise()));

  return results;
};
