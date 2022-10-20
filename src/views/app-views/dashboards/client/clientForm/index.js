import React, { useState, useEffect } from 'react';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
import useUpload from 'hooks/useUpload';
import { singleImageUploader } from 'utils/s3/s3ImageUploader';
import clientService from 'services/client';
import Utils from 'utils';
import { useHistory } from 'react-router-dom';
import fileManagerService from 'services/FileManager';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const ClientForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Normal Image
  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages
  } = useUpload(1);

  useEffect(() => {
    if (mode === EDIT) {
      const fetchClientById = async () => {
        const { id } = param;
        const data = await clientService.getClientById(id);
        if (data) {
          let himg = [];
          if (data.image) {
            himg = [
              {
                uid: Math.random() * 1000,
                title: Utils.getBaseName(data.image),
                url: data.image,
                thumbUrl: data.image
              }
            ];

            setImage(himg);
            setFileListImages(himg);
          }

          form.setFieldsValue({
            title: data.title,
            status: data.status,
            order: data.order
          });
        } else {
          history.replace('/app/dashboards/client/client-list');
        }
      };

      fetchClientById();
    }
  }, [form, mode, param, props]);

  const propsImages = {
    multiple: false,
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
        if (mode === ADD) {
          // Checking if image exists
          if (uploadedImg.length !== 0 && uploadedImg !== null) {
            console.log('uploadedImg', uploadedImg);
            // const imgValue = await singleImageUploader(
            //   uploadedImg[0].originFileObj,
            //   uploadedImg,
            //   uploadedImg[0].url,
            //   'client'
            // )
            const imgValue = await fileManagerService.getImageUrl(
              uploadedImg[uploadedImg.length - 1].originFileObj
            );

            console.log('imgValue', imgValue);

            values.image = imgValue;

            const created = await clientService.createClient(values);
            if (created) {
              message.success(`Created ${values.title} to Client list`);
              history.goBack();
            }
          } else {
            message.error('Please upload image');
          }
        }
        if (mode === EDIT) {
          // Checking if image exists
          if (uploadedImg.length !== 0 && uploadedImg !== null) {
            console.log('uploadedImg', uploadedImg);
            // const imgValue = await singleImageUploader(
            //   uploadedImg[0].originFileObj,
            //   uploadedImg,
            //   uploadedImg[0].url,
            //   'client'
            // );

            const imgValue = await fileManagerService.getImageUrl(
              uploadedImg[uploadedImg.length - 1].originFileObj
            );

            values.image = imgValue;
            // values.mobileImage = mobileImgValue

            const edited = await clientService.editClient(param.id, values);
            if (edited) {
              message.success(`Edited ${values.title} to Client list`);
              history.goBack();
            }
            setSubmitLoading(false);
          } else {
            message.error('Please upload image');
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
                {mode === 'ADD' ? 'Add New Client' : `Edit Client`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/client/client-list')
                  }
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
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
                // propsMobileImages={propsMobileImages}

                form={form}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ClientForm;
