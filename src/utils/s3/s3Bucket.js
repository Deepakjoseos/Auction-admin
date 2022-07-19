/* eslint-disable import/no-extraneous-dependencies */

// No need for this file

import S3 from 'react-aws-s3'

const config = {
  bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
  // dirName: 'media', /* optional */
  region: process.env.REACT_APP_S3_REGION,
  accessKeyId: process.env.REACT_APP_S3_ACCESSKEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
}

console.log(process.env, 'plsssssss')

// const newFileName = 'test-file';
const ReactS3Client = new S3(config)

export default ReactS3Client
