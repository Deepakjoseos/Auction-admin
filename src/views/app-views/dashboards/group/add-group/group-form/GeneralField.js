import React, { useEffect, useState } from "react";
import { Input, Row, Col, Card, Form, InputNumber, Select } from "antd";
import vehicletypeService from "services/vehicleType";
import participantService from "services/Participant";
import regionService from "services/region";
import cityService from "services/city";
// const { Dragger } = Upload
const { Option } = Select;

const rules = {
  name: [
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
  status: [
    {
      required: true,
      message: "Required",
    },
  ],
};

const GeneralField = (props) => {
  const [citys, setCitys] = useState([]);
  const [regions, setRegions] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await cityService.getcity();
        console.log(data, "city");
        setCitys(data);
        const data1 = await vehicletypeService.getVehicleTypes();
        console.log(data1, "city");
        setVehicleType(data1);
        console.log(regions, "asas");
        const data2 = await participantService.getAllParticipants();
        console.log(data2, "city");
        setParticipants(data2);
        const data3 = await regionService.getRegions();
        console.log(data3, "city");
        setRegions(data3);

        // console.log(vehicleType);
      } catch (error) {
        console.log(error, "err");
      }
    };

    getData();
  }, []);

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="business" label="Business Type" rules={rules.status}>
            <Select placeholder="Business Type">
              <Option value="Bank">Bank</Option>
              <Option value="Insurance">Insuarance</Option>
              <Option value="Consumer Auction">Consumer Auction</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="vehicleTypeId"
            label="Vehicle Type"
            rules={rules.status}
          >
            <Select placeholder="Vehicle Type">
              {vehicleType.map((v, k) => {
                return <Option value={v._id}>{v.name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item name="cityId" label="City" rules={rules.status}>
            <Select placeholder="city">
              {citys.map((v, k) => {
                return <Option value={v._id}>{v.name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item name="regionId" label="Region" rules={rules.status}>
            <Select placeholder="Region">
              {regions.map((v, k) => {
                return <Option value={v._id}>{v.name}</Option>;
              })}
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
