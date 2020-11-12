// const fs = require('fs');
// const AWS = require('aws-sdk');
// require('dotenv').config();

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const uploadFile = (fileName) => {
//   const fileContent = readFileSync('./pexels-element-digital-1194760-min.jpg');

//   const params = {
//     Bucket: 'generalbucketstorage',
//     Key: 'phone1.jpg', // filename that wil be in the storage
//     Body: fileContent,
//   };

//   s3.upload();
// };
// // i'll look into this stuff once frontend pages are mostly done
