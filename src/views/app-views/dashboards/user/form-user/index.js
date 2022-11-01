import React, { useState, useEffect } from 'react';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
import { useHistory } from 'react-router-dom';
import authAdminService from 'services/auth/admin';
import employeeTypeService from 'services/employeeType';
import ResetPassword from '../reset-password';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const UserForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();
  const [form] = Form.useForm();
  console.log(mode);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [employeeTypes, setEmployeeTypes] = useState([]);

  const getEmployeeTypes = async () => {
    const data = await employeeTypeService.getEmployeeTypes();
    if (data) {
      setEmployeeTypes(data);
    }
  };

  const fetchUser = async () => {
    const data = await authAdminService.getSubAdminById(param.id);
    console.log(data);
    if (data) {
      form.setFieldsValue({
        name: data.name,
        contact: data.contact,
        email: data.email,
        employeeTypeId: data.employeeType._id,
        status: data.status
      });
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    if (mode === EDIT) {
      fetchUser();
    }
    getEmployeeTypes();
  }, []);

  // Trigger When Submit Button pressed
  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          name: values?.name,
          email: values?.email,
          password: values?.password,
          contact: values?.contact,
          employeeTypeId: values?.employeeTypeId
        };

        console.log(sendingValues, 'values=====');

        if (mode === ADD) {
          const created = await authAdminService.createUser(sendingValues);
          if (created) {
            console.log(created);
            message.success(`Created New user ${values?.name}`);
            history.goBack();
          }
        }
        if (mode === EDIT) {
          const created = await authAdminService.editUser(
            sendingValues,
            param.id
          );
          if (created) {
            console.log(created);
            message.success(`Edites user ${values?.name}`);
            history.goBack();
          }
        }
        setSubmitLoading(false);
      })
      .catch((info) => {
        setSubmitLoading(false);
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
          group: 1
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
                {mode === 'ADD' ? 'Add New User' : `Edit User`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push('/app/dashboards/user/user-list')}
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
              <GeneralField mode={mode} employeeTypes={employeeTypes} />
            </TabPane>
            <TabPane tab="Reset password" key="2">
              <ResetPassword userId={param.id} />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default UserForm;
