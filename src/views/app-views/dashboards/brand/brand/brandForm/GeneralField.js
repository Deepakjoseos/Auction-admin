import React from 'react';
import { Input, Row, Col, Card, Form, Upload, Select } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon';

const { Option } = Select;

const rules = {
  name: [
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
  url: [
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
        {/* <Form.Item name="url" label="Url" rules={rules.url}>
          <Input placeholder="Name" />
        </Form.Item> */}

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
        <Upload listType="picture-card" name="logo" {...props.propsImages}>
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
