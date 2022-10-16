import React from 'react';
import { Col, Row, Card, Form, Input, Checkbox, Space, Select } from 'antd';

const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: 'Required'
    }
  ]
};

const GeneralField = ({ mode, form }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card
          title={mode === 'ADD' ? 'Add Employee Type' : 'Edit Employee Type'}
        >
          <Form.Item name="name" label="Name" rules={rules.required}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.List name="permissions">
            {(fields, { add, remove }) => {
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
                            form.getFieldValue('permissions')[field.name]
                              .fetch === true &&
                            form.getFieldValue('permissions')[field.name]
                              .add === true &&
                            form.getFieldValue('permissions')[field.name]
                              .edit === true &&
                            form.getFieldValue('permissions')[field.name]
                              .delete === true
                          }
                          onChange={(e) => {
                            const newFields = form.getFieldValue('permissions');
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
          <Form.Item name="status" label="Status" rules={rules.required}>
            <Select placeholder="Status">
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
