import React, { useState } from 'react';
import {
  Button,
  Upload,
  Select,
  Form,
  Col,
  Row,
  Card,
  Modal,
  Input
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: 'Required'
    }
  ]
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ImagesField = ({ setImages, images }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    console.log(file);

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = async (fileList, imageType) => {
    setImages((prevImage) => {
      const mutatedImages = structuredClone(prevImage);
      // fileList[fileList.length - 1].httpUrl = await fileManagerService.getImageUrl(
      //   fileList[fileList.length - 1].originFileObj
      // );
      console.log(mutatedImages);
      mutatedImages[imageType] = fileList;
      return mutatedImages;
    });
  };

  // const handleRemove = (file, imageType) => {
  //   const mutatedImages = structuredClone(images);
  // };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="General Images">
          <Upload
            openFileDialogOnClick={!previewVisible}
            type="file"
            listType="picture-card"
            fileList={images.general}
            onPreview={handlePreview}
            onChange={({ fileList, file }) => handleChange(fileList, 'general')}
            // onRemove={(file) => handleRemove(file, 'general')}
            multiple
            accept="image/png, image/jpeg, image/jpg"
            beforeUpload={() => false}
          >
            {uploadButton}
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Upload>
        </Card>
        <Card title="Interior Images">
          <Upload
            openFileDialogOnClick={!previewVisible}
            type="file"
            listType="picture-card"
            fileList={images.interior}
            onPreview={handlePreview}
            onChange={({ fileList }) => handleChange(fileList, 'interior')}
            multiple
            accept="image/png, image/jpeg, image/jpg"
            beforeUpload={() => false}
          >
            {uploadButton}
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Upload>
        </Card>

        <Card title="Exterior Images">
          <Upload
            openFileDialogOnClick={!previewVisible}
            type="file"
            listType="picture-card"
            fileList={images.exterior}
            onPreview={handlePreview}
            onChange={({ fileList }) => handleChange(fileList, 'exterior')}
            multiple
            accept="image/png, image/jpeg, image/jpg"
            beforeUpload={() => false}
          >
            {uploadButton}
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Upload>
        </Card>
      </Col>
    </Row>
  );
};

export default ImagesField;
