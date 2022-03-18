require('dotenv').config();
const { S3 } = require('aws-sdk');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
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

exports.s3Uploadv3 = async (file) => {
  const S3client = new S3Client();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${uuid()}-${file.originalname}`,
    Body: file.buffer,
  };

  return await S3client.send(new PutObjectCommand(param));
};
