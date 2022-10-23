import React, { useState, useEffect, useCallback } from 'react';

import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
import { useHistory } from 'react-router-dom';

import constantsService from 'services/constants';
import employeeTypeService from 'services/employeeType';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const EmployeeTypeForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const [permissions, setPermissions] = useState([]);

  const getPermissions = async () => {
    const data = await constantsService.getConstantsRole();
    if (data) {
      const curPermissions = data?.map((item) => {
        return {
          module: item,
          add: false,
          delete: false,
          edit: false,
          fetch: true
        };
      });
      setPermissions(curPermissions);
    }
  };

  const fetchEmployeeType = useCallback(async () => {
    const { id } = param;
    const data = await employeeTypeService.getEmployeeType(id);
    console.log(data);

    form.setFieldsValue({
      name: data.name,
      permissions: data.permissions,
      status: data.status
    });
  }, []);

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      permissions: permissions
    });

    if (mode === EDIT) fetchEmployeeType();
  }, [mode, permissions, form, fetchEmployeeType]);

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
          const added = await employeeTypeService.addEmployeeType(values);
          if (added) {
            message.success(`Added ${values.name} to Employee Types`);
            history.goBack();
          }
          setSubmitLoading(false);
        } else {
          const { id } = param;
          const edited = await employeeTypeService.editEmployeeType(id, values);
          if (edited) {
            message.success(`Edited ${values.name} to Employee Types`);
            history.goBack();
          }
          setSubmitLoading(false);
        }
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log('info', info);
        message.error('Please enter all required field ');
      });
    setSubmitLoading(false);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
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
              {mode === 'ADD' ? 'Add New Employee Type' : `Edit Employee Type`}{' '}
            </h2>
            <div className="mb-3">
              <Button
                className="mr-2"
                onClick={() =>
                  history.push(
                    '/app/dashboards/employee-type/employee-type-list'
                  )
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
            <GeneralField mode={mode} form={form} />
          </TabPane>
        </Tabs>
      </div>
    </Form>
  );
};

export default EmployeeTypeForm;
