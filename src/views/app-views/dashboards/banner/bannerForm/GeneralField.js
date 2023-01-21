import React from 'react';
import { Input, Row, Col, Card, Form, Upload, InputNumber, Select } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon';

// const { Dragger } = Upload
const { Option } = Select;

const rules = {
  title: [
    {
      required: true,
      message: 'Required'
    }
  ],
  url: [
    {
      required: true,
      message: 'Required'
    }
  ],
  image: [
    {
      required: true,
      message: 'Required'
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

const GeneralField = ({ images, propsImages }) => ( 
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="title" label="Title" rules={rules.title}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="url" label=" Url" rules={rules.url}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="priority" label="Priority" rules={rules.priority}>
          <InputNumber placeholder="Priority" min={0} max={100000} />
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
      <Card title="Image">
        <Form.Item name="image" >
          <Upload listType="picture-card" name="image" {...propsImages}>
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
        </Form.Item>
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
