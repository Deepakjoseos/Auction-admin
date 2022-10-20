import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space
} from 'antd';
import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import authAdminService from 'services/auth/admin';
import roleService from 'services/role';
import constantsService from 'services/constants';

const { Option } = Select;

// const valuess = [
//   'User',
//   'General',
//   'Car',
//   'Brand',
//   'Location',
//   'Vehicle Type',
//   'Participant',
//   'Wallet',
//   'Buying Limits',
//   'Group Members',
//   'Templates',
//   'Auctions',
//   'Deposits',
//   'Wallet Transactions',
//   'Client',
//   'Settings'
// ];

const EditRoleSubAdmin = ({ isFormOpen, setIsFormOpen, userId }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    const data = await constantsService.getConstantsRole();
    if (data) {
      const curRoles = data?.map((item) => {
        return {
          module: item,
          add: false,
          delete: false,
          edit: false,
          fetch: false
        };
      });
      setRoles(curRoles);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (roles?.length > 0) {
    }
  }, [roles]);

  //   const initialValues = {
  //     id: '',
  //     roles: [
  //       {
  //         module: 'BANNER',
  //         add: false,
  //         delete: false,
  //         edit: false,
  //         fetch: false,
  //       },
  //       {
  //         module: 'BRAND',
  //         add: false,
  //         delete: false,
  //         edit: false,
  //         fetch: false,
  //       },
  //       {
  //         module: 'CAR',
  //         add: false,
  //         delete: false,
  //         edit: false,
  //         fetch: false,
  //       },
  //       {
  //         module: 'USER',
  //         add: false,
  //         delete: false,
  //         edit: false,
  //         fetch: false,
  //       },
  //       {
  //         module: 'FUEL TYPE',
  //         add: false,
  //         delete: false,
  //         edit: false,
  //         fetch: false,
  //       },
  //       {
  //         module: 'INFORMATION',
  //         add: false,
  //         delete: false,
  //         edit: false,
  //         fetch: false,
  //       },
  //       //   {
  //       //     module: 'SETINGS',
  //       //     add: false,
  //       //     delete: false,
  //       //     edit: false,
  //       //     fetch: false,
  //       //   },
  //       {
  //         module: 'VEHICLE TYPE',
  //         add: false,
  //         delete: false,
  //         edit: false,
  //         fetch: false,
  //       },
  //     ],
  //   }

  const [form] = Form.useForm();

  const showDrawer = () => {
    setIsFormOpen(true);
  };

  const onClose = () => {
    setIsFormOpen(false);
  };

  const updateExistingRolesData = (arra2) => {
    const arra1 = roles.map((item) => {
      const item2 = arra2.find((i2) => i2.module === item.module);
      return item2 ? { ...item, ...item2 } : item;
    });

    return arra1;
  };

  const getSubAdminById = async (id) => {
    const data = await authAdminService.getSubAdminById(id);
    console.log(data, 'datasdsd');
    if (data) {
      form.setFieldsValue({
        id: data._id,
        roles:
          data.roles?.length > 0 ? updateExistingRolesData(data.roles) : roles
      });
    }
  };

  useEffect(() => {
    console.log(userId, 'userId');
    if (userId && roles) {
      getSubAdminById(userId);
    } else if (!userId && roles) {
      form.setFieldsValue({
        roles: roles
      });
    }
  }, [userId, roles]);

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, 'values=====');

        const sendingValues = {
          id: values.id || userId,
          roles: values.roles
        };

        const updated = await authAdminService.editSubAdminRole(sendingValues);
        if (updated) {
          message.success(`Updated Role`);
          onClose();
        }
        // values.country = 'India'
        // const data = await authVendorService.addPickupLocation(values)
        // if (data) {
        //   message.success('Pickup Location Added Successfully')
        //   onClose()
        //   form.resetFields()
        // }
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log('info', info);
        message.error('Please enter all required field ');
      });
    setSubmitLoading(false);
  };

  return (
    <>
      <Drawer
        title="Edit SubAdmin Role"
        width={720}
        onClose={onClose}
        visible={isFormOpen}
        bodyStyle={{
          paddingBottom: 80
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onFinish}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          //   initialValues={initialValues}
        >
          <Row gutter={16}>
            <>
              <Form.List name="roles">
                {(fields, { add, remove }) => {
                  console.log(fields, 'fieldwdwdrws');
                  return (
                    <>
                      {fields.map((field) => (
                        <Space
                          key={field.key}
                          style={{ display: 'flex' }}
                          align="baseline"
                        >
                          <Form.Item
                            {...field}
                            name={[field.name, 'module']}
                            fieldKey={[field.fieldKey, 'module']}
                          >
                            <Input disabled />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, 'add']}
                            fieldKey={[field.fieldKey, 'add']}
                            key={field.name}
                            valuePropName="checked"
                          >
                            <Checkbox>Add</Checkbox>
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, 'edit']}
                            fieldKey={[field.fieldKey, 'edit']}
                            key={field.name}
                            valuePropName="checked"
                          >
                            <Checkbox>Edit</Checkbox>
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, 'delete']}
                            fieldKey={[field.fieldKey, 'delete']}
                            key={field.name}
                            valuePropName="checked"
                          >
                            <Checkbox>Delete</Checkbox>
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, 'fetch']}
                            fieldKey={[field.fieldKey, 'fetch']}
                            key={field.name}
                            valuePropName="checked"
                          >
                            <Checkbox>Fetch</Checkbox>
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, 'new']}
                            fieldKey={[field.fieldKey, 'new']}
                            key={field.name}
                          >
                            <Checkbox
                              checked={
                                form.getFieldValue('roles')[field.name]
                                  .fetch === true &&
                                form.getFieldValue('roles')[field.name].add ===
                                  true &&
                                form.getFieldValue('roles')[field.name].edit ===
                                  true &&
                                form.getFieldValue('roles')[field.name]
                                  .delete === true
                              }
                              onChange={(e) => {
                                const newFields = form.getFieldValue('roles');
                                newFields[field.name].fetch = e.target.checked;
                                newFields[field.name].delete = e.target.checked;
                                newFields[field.name].add = e.target.checked;
                                newFields[field.name].edit = e.target.checked;

                                form.setFieldsValue({
                                  roles: newFields
                                });
                              }}
                            >
                              Select All
                            </Checkbox>
                          </Form.Item>
                        </Space>
                      ))}
                    </>
                  );
                }}
              </Form.List>
            </>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EditRoleSubAdmin;
