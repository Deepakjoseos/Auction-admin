import React from "react";
import { Input, Row, Col, Card, Form, Upload, InputNumber, Select } from "antd";

// const { Dragger } = Upload
const { Option } = Select;

const rules = {
  title: [
    {
      required: true,
      message: "Required",
    },
  ],

  status: [
    {
      required: true,
      message: "Required",
    },
  ],
  order: [
    {
      required: true,
      message: "Required",
    },
  ],
};

const GeneralField = ({ images, propsImages }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" rules={rules.title}>
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item name="priority" label="priority" rules={rules.order}>
          <InputNumber placeholder="Order" min={0} max={100000} />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={rules.status}>
          <Select placeholder="Status">
            <Option value="Active">Active</Option>
            <Option value="Hold">Hold</Option>
          </Select>
        </Form.Item>
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
