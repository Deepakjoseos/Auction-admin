import React, { useState, useEffect } from 'react';
import {
  message,
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
import { useHistory } from 'react-router-dom';
import participantService from 'services/Participant';
import { PlusOutlined } from '@ant-design/icons';
import fileManagerService from 'services/FileManager';

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

function validURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
}

const DocumentForm = (props) => {
  const { participantId } = props;
  const history = useHistory();
  const [docs, setDocs] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewDoc, setPreviewDoc] = useState({});
  const [titleValue, setTitleValue] = useState(null);
  const [descriptionValue, setDescriptionValue] = useState(null);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const fetchDocs = async () => {
    const data = await participantService.getParticipantById(participantId);
    if (data) {
      const mutatedData = [];
      data.documents.forEach((doc, index) => {
        mutatedData.push({
          uid: doc.title + index,
          name: 'image.png',
          status: 'done',
          url: doc.url,
          title: doc.title,
          description: doc.description
        });
      });
      setDocs(mutatedData);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const onSubmit = async () => {
    setSubmitLoading(true);

    const mutatedDocs = [];

    for (const doc of docs) {
      let url = null;

      if (!doc.title || !doc.description) {
        message.error('Please fill all the documents required fields');
        return;
      }

      if (!validURL(doc.url)) {
        url = await fileManagerService.getImageUrl(doc.originFileObj);
      }

      const data = {
        documentNumber: doc.uid,
        url: url ? url : doc.url,
        title: doc.title,
        description: doc.description
      };
      mutatedDocs.push(data);
    }

    const uploaded = await participantService.editParticipantDocument(
      { documents: mutatedDocs },
      participantId
    );

    console.log(uploaded);
    if (uploaded) {
      message.success(`Uploaded Auction Inventory Image.`);
      history.goBack();
      setSubmitLoading(false);
    }

    // const uploaded = await auctionInventoryService.updateAuctionInventoryImages(
    //   inventoryId,
    //   formData
    // );
    // if (uploaded) {
    //   message.success(`Uploaded Auction Inventory Image.`);
    //   history.goBack();
    //   setSubmitLoading(false);
    // }
  };

  const handleCancel = () => {
    const previewDocMutated = structuredClone(previewDoc);
    if (titleValue) {
      previewDocMutated.title = titleValue;
    }
    if (descriptionValue) {
      previewDocMutated.description = descriptionValue;
    }

    const docsMutated = structuredClone(docs);
    console.log('before', docsMutated);
    const docIndex = docsMutated.findIndex(
      (doc) => doc.uid === previewDocMutated.uid
    );

    docsMutated[docIndex] = previewDocMutated;

    console.log('after', docsMutated);

    setDocs(docsMutated);
    setTitleValue(null);
    setDescriptionValue(null);
    setPreviewDoc({});
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url) {
      file.url = await getBase64(file.originFileObj);
    }

    console.log('file', file);

    setPreviewDoc(file);
    setPreviewVisible(true);
  };

  const handleChange = async ({ fileList }) => {
    const mutatedFileList = [];

    for (const file of fileList) {
      const mutatedFile = structuredClone(file);
      // if (!mutatedFile.url) {
      //   mutatedFile.url = await getImageUrl(mutatedFile.originFileObj);
      // }

      if (!mutatedFile.title) {
        mutatedFile.title = '';
      }

      if (!mutatedFile.description) {
        mutatedFile.description = '';
      }

      mutatedFileList.push(mutatedFile);
    }

    console.log(mutatedFileList);

    setDocs(mutatedFileList);
  };

  console.log(docs);

  console.log('titleValue', titleValue);

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Upload Participants documents">
          <Upload
            openFileDialogOnClick={!previewVisible}
            type="file"
            listType="picture-card"
            fileList={docs}
            onPreview={handlePreview}
            onChange={handleChange}
            multiple
            accept="image/png, image/jpeg, image/jpg"
          >
            {uploadButton}
            {previewVisible && (
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewDoc.url}
                />
                <Form.Item style={{ marginTop: '20px' }} label="Title">
                  <Input
                    placeholder={previewDoc.title}
                    onChange={(e) => setTitleValue(e.target.value)}
                  />
                </Form.Item>
                <Form.Item style={{ marginTop: '20px' }} label="Description">
                  <Input.TextArea
                    rows={4}
                    placeholder={previewDoc.description}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                  />
                </Form.Item>
              </Modal>
            )}
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

export default DocumentForm;
