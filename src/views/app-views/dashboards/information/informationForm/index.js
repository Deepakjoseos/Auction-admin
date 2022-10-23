import React, { useState, useEffect } from 'react';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
import useUpload from 'hooks/useUpload';
import { singleImageUploader } from 'utils/s3/s3ImageUploader';
import informationService from 'services/information';
import Utils from 'utils';
import { useHistory } from 'react-router-dom';
import fileManagerService from 'services/FileManager';
import useUserPrivilege from 'hooks/useUserPrivilege';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const InformationForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState(null);
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editorRender, setEditorRender] = useState(false);

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages
  } = useUpload(1);

  useEffect(() => {
    if (mode === EDIT) {
      const fetchInformationById = async () => {
        const { id } = param;
        const data = await informationService.getInformationById(id);
        if (data) {
          let himg = [];
          if (data.image) {
            himg = [
              {
                uid: Math.random() * 1000,
                name: Utils.getBaseName(data.image),
                url: data.image,
                thumbUrl: data.image
              }
            ];

            setImage(himg);
            setFileListImages(himg);
          }

          form.setFieldsValue({
            name: data.name,
            status: data.status,
            priority: data.priority,
            description: data.description
          });

          setEditorRender(true);
        } else {
          history.replace('/app/dashboards/information/information-list');
        }
      };

      fetchInformationById();
    }
  }, [form, mode, param, props]);

  const propsImages = {
    multiple: true,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages
  };

  useEffect(() => {
    console.log(fileListImages, 'hey-me');
    setImage(fileListImages);
  }, [fileListImages]);

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const imageUrl = await fileManagerService.getImageUrl(
          uploadedImg[uploadedImg.length - 1].originFileObj
        );
        if (mode === ADD) {
          // Checking if image exists

          // if (uploadedImg.length !== 0 && uploadedImg !== null) {
          //   const imgValue = await singleImageUploader(
          //     uploadedImg[0].originFileObj,
          //     uploadedImg,
          //     uploadedImg[0].url,
          //     'information'
          //   );
          //   values.image = imgValue;
          // } else {
          //   values.image = null;
          // }

          console.log(values, 'valuesssss');

          const created = await informationService.createInformation({
            ...values,
            image: imageUrl
          });
          if (created) {
            message.success(`Created ${values.name} to Information list`);
            history.goBack();
          }
        }
        if (mode === EDIT) {
          // Checking if image exists
          console.log('uploadedImg', uploadedImg);
          // if (uploadedImg.length !== 0 && uploadedImg !== null) {
          //   const imgValue = await singleImageUploader(
          //     uploadedImg[0].originFileObj,
          //     uploadedImg,
          //     uploadedImg[0].url,
          //     'information'
          //   );
          //   values.image = imgValue;
          // } else {
          //   values.image = null;
          // }

          const edited = await informationService.editInformation(param.id, {
            ...values,
            image: imageUrl
          });
          if (edited) {
            message.success(`Edited ${values.name} to Information list`);
            history.goBack();
          }
        }
        setSubmitLoading(false);
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log('info', info);
        message.error('Please enter all required field ');
      });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold'
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === 'ADD' ? 'Add New Information' : `Edit Information`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/information/information-list')
                  }
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  // disabled={submitLoading}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === 'ADD' ? 'Add' : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
                uploadedImg={uploadedImg}
                // uploadLoading={uploadLoading}
                // handleUploadChange={handleUploadChange}
                propsImages={propsImages}
                form={form}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default InformationForm;
