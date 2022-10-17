import React from 'react';
import { Col, Row, Card, Form, Select } from 'antd';
const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: 'Required'
    }
  ]
};

const GeneralField = ({ mode, inventories, participants }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title={mode === 'ADD' ? 'Add Winning' : 'Edit Winning'}>
          <Form.Item
            name="auctionInventoryId"
            label="Select Inventory"
            rules={rules.required}
          >
            <Select
              style={{ minWidth: '120px', marginBottom: '10px' }}
              placeholder="Select Inventory"
              rules={rules.required}
              showSearch
            >
              {inventories?.map((inventory) => (
                <Option key={inventory._id} value={inventory._id}>
                  {inventory._id}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="winnerId"
            label="Select Participant"
            rules={rules.required}
          >
            <Select
              style={{ minWidth: '120px', marginBottom: '10px' }}
              placeholder="Select Participant"
              rules={rules.required}
              showSearch
            >
              {participants?.map((participant) => (
                <Option key={participant._id} value={participant._id}>
                  {participant.email}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
