import React from "react";
import { Input, Row, Col, Card, Form, InputNumber } from "antd";

const rules = {
  amount: [
    {
      required: true,
      message: "Required",
    },
  ],

  remark: [
    {
      required: true,
      message: "Required",
    },
  ],
  participant: [
    {
      required: false,
    },
  ],
};

const BuyingLimitField = () => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <Form.Item name="amount" label="Limit Amount" rules={rules.amount}>
            <InputNumber placeholder="Amount" min={0} />
          </Form.Item>

          <Form.Item name="remark" label="Remark" rules={rules.remark}>
            <Input placeholder="Remark" />
          </Form.Item>
          <Form.Item
            name="participant"
            label="Participant"
            rules={rules.participant}
          >
            <Input placeholder="Participant" disabled />
          </Form.Item>
        </div>
      </Card>
    </Col>
  </Row>
);

export default BuyingLimitField;
