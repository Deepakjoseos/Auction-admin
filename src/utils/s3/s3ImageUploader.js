// import ReactS3Client from 'utils/s3/s3Bucket'

import S3 from 'react-aws-s3'

const { notification } = require('antd')

const multipleImageUpload = async (images, folder, descriptionRequired) => {
  const imagesArray = await images.reduce(async (result, el) => {
    if (el.originFileObj) {
      const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
        dirName: folder /* optional */,
        region: process.env.REACT_APP_S3_REGION,
        accessKeyId: process.env.REACT_APP_S3_ACCESSKEY_ID,
        secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
      }

      // const newFileName = 'test-file';
      const ReactS3Client = new S3(config)
      try {
        const asyncResult = await ReactS3Client.uploadFile(
          el.originFileObj
          // formValues.images[1].originFileObj.name,
        )
        if (asyncResult) {
          if (descriptionRequired) {
            ;(await result).push({
              image: asyncResult.location,
              description: el.description,
            })
          } else {
            ;(await result).push(asyncResult.location)
          }
        }
      } catch (err) {
        // (await result).push(result.location);
        notification.error({
          message: 'Cannot upload Newly added Images',
        })

        console.log(err.message, 'pls')
      }
    } else {
      if (descriptionRequired) {
        ;(await result).push({
          image: el.url,
          description: el.description,
        })
      } else {
        ;(await result).push(el.url)
      }
    }

    return result
  }, [])

  return imagesArray
}

const singleImageUploader = async (file, imgValue, defaultValueUrl, folder) => {
  console.log('filesss', file)
  if (file) {
    const config = {
      bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
      dirName: folder /* optional */,
      region: process.env.REACT_APP_S3_REGION,
      accessKeyId: process.env.REACT_APP_S3_ACCESSKEY_ID,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    }

    // const newFileName = 'test-file';
    const ReactS3Client = new S3(config)

    console.log(file, 'show-correct')
    try {
      const asyncResult = await ReactS3Client.uploadFile(
        file
        // formValues.images[1].originFileObj.name,
      )
      imgValue = asyncResult.location
    } catch (err) {
      // (await result).push(result.location);
      notification.error({
        message: 'Cannot upload Newly added Images',
      })

      console.log(err, 'pls')
    }
  } else {
    imgValue = defaultValueUrl
  }
  return imgValue
}

export { multipleImageUpload, singleImageUploader }
