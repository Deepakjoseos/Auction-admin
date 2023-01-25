import React from 'react';
import { Input, Row, Col, Card, Form, Select } from 'antd';

const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: 'Required'
    }
  ],

  abbreviation: [
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
  ]
};

const GeneralField = ({ images, propsImages, regions }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}> */}
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="regionId"
            label="Region"
            rules={rules.name}
            placeholder="Region"
          >
            <Select 
            // style={{ width: '150px' }}
            >
              {regions.map((region) => (
                <Option  value={region._id}>{region.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="abbreviation"
            label="Abbreviation"
            rules={rules.abbreviation}
          >
            <Input placeholder="Abbreviation" />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={rules.status}>
            <Select placeholder="Status">
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </Form.Item>
        {/* </div> */}
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
