import React, { useState } from 'react';
import { Col, Row, Card, Form, Select, InputNumber } from 'antd';
const { Option } = Select;

const rules = {
  required: [
    {
      required: true,
      message: 'Required'
    }
  ]
};

const GeneralField = ({ mode, biddings, setValues }) => {
  const [selectedBidId, setSelectedBidId] = useState(null);

  if (biddings && selectedBidId) {
    const selectedBid = biddings.find((bid) => bid._id === selectedBidId);
    setValues({
      finalAmount: selectedBid.amount
    });
  }

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title={mode === 'ADD' ? 'Add Winning' : 'Edit Winning'}>
          <Form.Item name="bidId" label="Select bid" rules={rules.required}>
            <Select
              style={{ minWidth: '120px', marginBottom: '10px' }}
              placeholder="Select bid"
              rules={rules.required}
              showSearch
              onChange={(e) => setSelectedBidId(e)}
            >
              {biddings?.map((bid) => (
                <Option key={bid._id} value={bid._id}>
                  {`${bid.auctionInventory.registrationNumber} (${bid.auction.name}) - ${bid.amount}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="finalAmount"
            label="Enter final amount"
            rules={rules.required}
          >
            <InputNumber disabled={!selectedBidId} min={0} />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
