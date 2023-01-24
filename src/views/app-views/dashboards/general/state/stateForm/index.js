import React, { useState, useEffect } from 'react';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
import { useHistory } from 'react-router-dom';
import regionService from 'services/region';
import stateService from 'services/state';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const ClientForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    if (mode === EDIT) fetchState();
    getRegions();
  }, [form, mode, param, props]);

  const fetchState = async () => {
    const { id } = param;
    const data = await stateService.getState(id);
    console.log(data);
    if (data) {
      form.setFieldsValue({
        name: data?.name,
        status: data?.status,
        regionId: data?.region._id,
        abbreviation: data?.abbreviation
      });
    } else {
      history.replace('/app/dashboards/general/state/state-list');
    }
  };

  const getRegions = async () => {
    const data = await regionService.getRegions();
    if (data) setRegions(data);
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
          const created = await stateService.createState(values);
          if (created) {
            message.success(`Created ${values.name} to State list`);
            history.goBack();
          }
        }
        if (mode === EDIT) {
          const edited = await stateService.updateState(param.id, values);
          if (edited) {
            message.success(`Edited ${values.name} to State list`);
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
                {mode === 'ADD' ? 'Add New State' : `Edit State`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/general/state/state-list')
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
              <GeneralField regions={regions} />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ClientForm;
