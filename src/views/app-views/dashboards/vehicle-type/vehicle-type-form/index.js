import React, { useState, useEffect } from 'react';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
import useUpload from 'hooks/useUpload';
import { singleImageUploader } from 'utils/s3/s3ImageUploader';
import BannerService from 'services/banner';
import Utils from 'utils';
import { useHistory } from 'react-router-dom';
import vehicletypeService from 'services/vehicleType';
import fileManagerService from 'services/FileManager';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const VehicleTypeForm = (props) => {
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
      const fetchVehicleTypeById = async () => {
        const { id } = param;
        const data = await vehicletypeService.getVehicleTypeById(id);
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
            name: data.name,
            status: data.status
          });
        } else {
          history.replace('/app/dashboards/vehicle-type/vehicle-type-list');
        }
      };

      fetchVehicleTypeById();
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
            //   'vehicle-type'
            // )

            const imgValue = await fileManagerService.getImageUrl(
              uploadedImg[uploadedImg.length - 1].originFileObj
            );

            console.log('imgValue', imgValue);

            values.image = imgValue;

            const created = await vehicletypeService.createVehicleType(values);
            if (created) {
              message.success(`Created ${values.name} to Vehicle Type list`);
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
            //   'banner'
            // );

            const imgValue = await fileManagerService.getImageUrl(
              uploadedImg[uploadedImg.length - 1].originFileObj
            );

            values.image = imgValue;

            const edited = await vehicletypeService.editVehicleType(
              param.id,
              values
            );
            if (edited) {
              message.success(`Edited ${values.title} to Banner list`);
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
                {mode === 'ADD' ? 'Add New Vehicle Type' : `Edit Vehicle Type`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/vehicle-type/vehicle-type-list'
                    )
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
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default VehicleTypeForm;
