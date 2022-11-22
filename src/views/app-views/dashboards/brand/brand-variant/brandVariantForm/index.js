import React, { useState, useEffect } from 'react';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
import useUpload from 'hooks/useUpload';
import { singleImageUploader } from 'utils/s3/s3ImageUploader';
import brandService from 'services/brand';
import Utils from 'utils';
import { useHistory } from 'react-router-dom';
import brandVariantService from 'services/brandVariant.service';
import fileManagerService from 'services/FileManager';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const BrandVariantForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();

  // For Image Upload
  const [uploadedImg, setImage] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState([]);

  // For Image upload
  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages
  } = useUpload(1);

  useEffect(() => {
    if (mode === EDIT) fetchBrandVariantById();
    fetchBrands();
  }, [form, mode, param, props]);

  const fetchBrands = async () => {
    const data = await brandService.getBrands();
    if (data) setBrands(data);
  };

  const fetchBrandVariantById = async () => {
    const { id } = param;
    const data = await brandVariantService.getById(id);
    if (data) {
      // For Image upload
      let himg = [];
      if (data.logo) {
        himg = [
          {
            uid: Math.random() * 1000,
            name: Utils.getBaseName(data.logo),
            url: data.logo,
            thumbUrl: data.logo
          }
        ];

        setImage(himg);
        setFileListImages(himg);
      }
      // For setting form values when Load if it is in EDIT mode
      form.setFieldsValue({
        name: data.name,
        status: data.status,
        brandId: data.brand._id
      });
    } else {
      history.replace('/app/dashboards/brand/brand-variant/brand-variant-list');
    }
  };

  // Image Upload
  const propsImages = {
    multiple: false,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages
  };

  // Image Upload
  useEffect(() => {
    setImage(fileListImages);
  }, [fileListImages]);

  // Trigger When Submit Button pressed
  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        if (uploadedImg.length < 1) {
          message.error('Please upload atleast one image');
          setSubmitLoading(false);
          return;
        }

        let imgValue = uploadedImg[uploadedImg.length - 1]?.url;

        if (uploadedImg[uploadedImg.length - 1].originFileObj) {
          imgValue = await fileManagerService.getImageUrl(
            uploadedImg[uploadedImg.length - 1].originFileObj,
            'brand'
          );
        }

        values.logo = imgValue;

        if (mode === ADD) {
          const created = await brandVariantService.create(values);
          if (created) {
            message.success(`Add ${values.name} to Brand Variant List`);
            history.goBack();
          }
        }
        if (mode === EDIT) {
          const edited = await brandVariantService.edit(param.id, values);
          if (edited) {
            message.success(`Edited ${values.name} to Brand Variant list`);
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
                {mode === 'ADD'
                  ? 'Add New Brand Variant'
                  : `Edit Brand Variant`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/brand/brand-variant/brand-variant-list'
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
                brands={brands}
                uploadedImg={uploadedImg}
                // uploadLoading={uploadLoading}
                // handleUploadChange={handleUploadChange}
                propsImages={propsImages}
                formMode={mode}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default BrandVariantForm;
