import React, { useState } from 'react';
import { Button, Upload, Select, Form, Col, Row, Card, Modal, Input } from 'antd';
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

const ImagesField = ({ setImages, images, setImageType, onSubmit }) => {
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

  const handleChange = ({ fileList }) => {
    setImages(fileList);
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Upload Auction Inventory Images">
          <Form.Item
            name="imageType"
            label="Select image type"
            rules={rules.required}
          >
            <Select
              style={{ minWidth: '120px', marginBottom: '10px' }}
              placeholder="Select image type"
              onChange={(e) => setImageType(e)}
            >
              <Option value={'General'}>General</Option>
              <Option value={'Interior'}>Interior</Option>
              <Option value={'Exterior'}>Exterior</Option>
            </Select>
          </Form.Item>

          <Upload
            openFileDialogOnClick={!previewVisible}
            type="file"
            listType="picture-card"
            fileList={images}
            onPreview={handlePreview}
            onChange={handleChange}
            multiple
            accept="image/png, image/jpeg, image/jpg"
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
          <Button
            type="primary"
            htmlType="button"
            style={{ float: 'right', marginTop: '20px' }}
            onClick={onSubmit}
          >
            Add
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default ImagesField;
