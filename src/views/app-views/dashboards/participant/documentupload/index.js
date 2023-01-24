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
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon';
import useUpload from 'hooks/useUpload';
import ImageDescription from 'components/shared-components/ImageDescription';
import Utils from 'utils';

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

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList
  } = useUpload(1, 'multiple');

  const propsImages = {
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages
  };

  useEffect(() => {
    console.log(fileListImages, 'hey-me');
    setDocs(fileListImages);
  }, [fileListImages]);

  console.log(docs);

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
          uid: Math.random() * 1000,
          name: Utils.getBaseName(doc.url),
          status: doc?.status,
          url: doc?.url,
          thumbUrl: doc?.url,
          title: doc?.title,
          description: doc?.description
        });
      });
      setDocs(mutatedData);
      setFileList(mutatedData);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const onSubmit = async () => {
    const hide = message.loading('Updating documents..', 0);

    const mutatedDocs = [];

    for (const doc of docs) {
      let url = null;

      if (!doc.title || !doc.description) {
        message.error('Please fill all the documents required fields');
        hide();
        setSubmitLoading(false);
        return;
      }

      if (!validURL(doc.url)) {
        url = await fileManagerService.getImageUrl(doc.originFileObj);
      }

      const data = {
        documentNumber: doc.uid.toString(),
        url: url ? url : doc.url,
        title: doc.title,
        description: doc.description,
        status: doc.status
      };
      mutatedDocs.push(data);
    }

    const uploaded = await participantService.editParticipantDocument(
      { documents: mutatedDocs },
      participantId
    );

    if (uploaded) {
      message.success(`Uploaded Document.`);
      setSubmitLoading(false);
    }
    hide();
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Upload Participants documents">
          <Upload
            listType="picture-card"
            name="image"
            {...propsImages}
            accept="image/png, image/jpeg, image/jpg"
          >
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>

          <h4> Title, Description Note </h4>
          {docs?.map((cur) => (
            <>
              {cur?.url ? (
                <>
                  <ImageDescription
                    url={cur?.url}
                    description={cur?.description}
                    title={cur?.title}
                    status={cur?.status}
                    file={null}
                    setImages={setDocs}
                    images={docs}
                    hasTitle={true}
                    hasStatus={true}
                    id={cur?.uid}
                    onRemove={true}
                    setFileList={setFileList}
                  />
                </>
              ) : (
                <>
                  <ImageDescription
                    url={null}
                    description={cur?.description}
                    title={cur?.title}
                    status={cur?.status}
                    file={cur?.originFileObj}
                    setImages={setDocs}
                    images={docs}
                    hasTitle={true}
                    hasStatus={true}
                    id={cur?.uid}
                    onRemove={true}
                    setFileList={setFileList}
                  />
                </>
              )}
            </>
          ))}
          <Button
            type="primary"
            htmlType="button"
            style={{ float: 'right', marginTop: '20px' }}
            onClick={onSubmit}
          >
            Update
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default DocumentForm;
