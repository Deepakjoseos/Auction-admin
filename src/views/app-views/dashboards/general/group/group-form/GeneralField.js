import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Card, Form, InputNumber, Select } from 'antd';
import vehicletypeService from 'services/vehicleType';
import participantService from 'services/Participant';
import regionService from 'services/region';
import cityService from 'services/city';
import stateService from 'services/state';
// const { Dragger } = Upload
const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: 'Required'
    }
  ],
  order: [
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

const GeneralField = ({ form }) => {
  const [citys, setCitys] = useState([]);
  const [states, setStates] = useState([]);
  const [regions, setRegions] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await cityService.getCities();
      setCitys(data);
      const data1 = await vehicletypeService.getVehicleTypes();
      setVehicleType(data1);
      const data2 = await participantService.getAllParticipants('participantType=Seller');
      setParticipants(data2);
      const data3 = await regionService.getRegions();
      setRegions(data3);
      const states = await stateService.getStates();
      setStates(states);

      // console.log(vehicleType);
    } catch (error) {
      console.log(error, 'err');
    }
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="businessTypes"
            label="Business Type"
            rules={rules.status}
          >
            <Select placeholder="Business Type" mode="multiple">
              <Option value="Bank">Bank</Option>
              <Option value="Insurance">Insuarance</Option>
              <Option value="Consumer Auction">Consumer Auction</Option>
            </Select>
          </Form.Item>
          <Form.Item name="vehicleTypeIds" label="Vehicle Type">
            <Select placeholder="Vehicle Type" mode="multiple">
              {vehicleType.map((v, k) => {
                return <Option value={v._id}>{v.name}</Option>;
              })}
            </Select>
          </Form.Item>
          {/* <Form.Item name="cityIds" label="City">
            <Select placeholder="city" mode="multiple">
              {citys.map((v, k) => {
                return <Option value={v._id}>{v.name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item name="stateIds" label="State">
            <Select placeholder="state" mode="multiple">
              {states.map((v, k) => {
                return <Option value={v._id}>{v.name}</Option>;
              })}
            </Select>
          </Form.Item> */}
          <Form.Item name="regionIds" label="Region" rules={rules.status}>
            <Select placeholder="Region" mode="multiple">
              {regions.map((v, k) => {
                return <Option value={v._id}>{v.name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item name="sellerIds" label="Seller Name">
            <Select placeholder="Seller Name" mode="multiple">
              {participants.map((participant) => (
                <Option value={participant._id}>{participant.name}</Option>
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
};

export default GeneralField;
