import React, { useState, useEffect } from 'react';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
import useUpload from 'hooks/useUpload';
import { singleImageUploader } from 'utils/s3/s3ImageUploader';
import Utils from 'utils';
import { useHistory } from 'react-router-dom';
import regionService from 'services/region';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const ClientForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (mode === EDIT) {
      const fetchBannerById = async () => {
        const { id } = param;
        const data = await regionService.getRegionsByID(id);
        if (data) {
          form.setFieldsValue({
            name: data.name,
            status: data.status,
            priority: data.priority
          });
        } else {
          history.replace('/app/dashboards/general/region/region-list');
        }
      };

      fetchBannerById();
    }
  }, [form, mode, param, props]);

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
          // Checking if image exists

          const created = await regionService.createRegion(values);
          if (created) {
            message.success(`Created ${values.name} to Region list`);
            history.goBack();
          }
        }
        if (mode === EDIT) {
          // Checking if image exists

          // values.mobileImage = mobileImgValue

          const edited = await regionService.updateRegion(param.id, values);
          if (edited) {
            message.success(`Edited ${values.title} to Client list`);
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
                {mode === 'ADD' ? 'Add New Region' : `Edit Region`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/general/region/region-list')
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
              // uploadLoading={uploadLoading}
              // handleUploadChange={handleUploadChange}

              // propsMobileImages={propsMobileImages}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ClientForm;
