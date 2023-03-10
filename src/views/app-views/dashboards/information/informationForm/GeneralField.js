import React from 'react';
import { Input, Row, Col, Card, Form, Upload, InputNumber, Select } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon';
import Editor from 'components/shared-components/Editor';

// const { Dragger } = Upload
const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: 'Required'
    }
  ],
  description: [
    {
      required: true,
      message: 'Required'
    }
  ],
  image: [
    {
      required: true,
      message: 'required'
    }
  ],
  status: [
    {
      required: true,
      message: 'Required'
    }
  ],
  priority: [
    {
      required: true,
      message: 'Required'
    }
  ]
};

const GeneralField = (props) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" rules={rules.name}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={rules.description}
        >
          <Editor
            placeholder="Write something..."
            editorHtml={props.form.getFieldValue('description') || ''}
            onChange={(e) => props.form.setFieldsValue({ description: e })}
            name="description"
          />
        </Form.Item>
        <Form.Item name="priority" label="Priority" rules={rules.priority}>
          <InputNumber
            placeholder="Priority"
            size="large"
            min={0}
            max={100000}
          />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={rules.status}>
          <Select placeholder="Status">
            <Option value="Active">Active</Option>
            <Option value="Hold">Hold</Option>
          </Select>
        </Form.Item>
      </Card>
    </Col>
    <Col xs={24} sm={24} md={7}>
      <Card title="Media">
        <Form.Item name="image" >
          <Upload listType="picture-card" name="image" {...props.propsImages}>
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
        </Form.Item>
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
