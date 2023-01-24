import React from "react";
import { Input, Row, Col, Card, Form, Select } from "antd";

const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: "Required",
    },
  ],

  stateId: [
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
};

const GeneralField = ({ states }) => (
  <Row gutter={20}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
       
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item name="stateId" label="State" rules={rules.stateId}>
            <Select
              showSearch
              placeholder="State"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              optionFilterProp="children"
              //   defaultValue={
              //     states.find((state) => state._id === rules.stateId).name
              //   }
            >
              {states.map((state) => (
                <Option disabled={state.status === "Hold"} value={state._id}>
                  {state.name}
                </Option>
              ))}
            </Select>
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
