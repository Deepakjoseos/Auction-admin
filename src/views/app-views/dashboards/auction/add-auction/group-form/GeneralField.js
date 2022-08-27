import React, { useEffect, useState } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
} from "antd";
import vehicletypeService from "services/vehicleType";
import participantService from "services/Participant";
import regionService from "services/region";
import cityService from "services/city";
import clientService from "services/client";
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
  const [clients, setClients] = useState([]);
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
        const data3 = await regionService.getRegions();
        console.log(data3, "city");
        setRegions(data3);
        const data4 = await clientService.getClients();
        setClients(data4);
        console.log(data4, "asssdsdsdsdsdsdsd");

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
          <Form.Item
            name="businessType"
            label="Business Type"
            rules={rules.status}
          >
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
          <Form.Item name="clientId" label="clientId" rules={rules.status}>
            <Select placeholder="clientId">
              {clients.map((v, k) => {
                return <Option value={v._id}>{v.title}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item name="type" label="Type" rules={rules.status}>
            <Select placeholder="Type">
              <Option value="Yard">Yard</Option>
              <Option value="Online">Online</Option>

              <Option value="Open">Open</Option>
            </Select>
          </Form.Item>
          <Form.Item name="format" label="Format" rules={rules.status}>
            <Select placeholder="Status">
              <Option value="Close">Close</Option>
              <Option value="Open">Open</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={rules.status}>
            <Select placeholder="Status">
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </Form.Item>
          <Form.Item name="closeType" label="closeType" rules={rules.status}>
            <Select placeholder="Close Type">
              <Option value="Show Rank">Show rank</Option>
              <Option value="Hide Rank">Hide rank</Option>
            </Select>
          </Form.Item>
          <Form.Item name="bidLimit" label="Bid Limit" rules={rules.status}>
            <Input type={"number"} />
          </Form.Item>
          <Form.Item
            name="termsAndConditions"
            label="Terms And Conditions"
            rules={rules.status}
          >
            <Input type={"text"} />
          </Form.Item>
          <Form.Item
            name={"startTimestamp"}
            label="Start Date"
            rules={rules.status}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name={"endTimestamp"}
            label="End Date"
            rules={rules.status}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="showRegNumber"
            lable="Show Reg Number"
            valuePropName="checked"
          >
            <Checkbox checked={false}>Show Reg Number</Checkbox>
          </Form.Item>
          <Form.Item
            name="showChasisNumber"
            lable="show Chasis Number"
            valuePropName="checked"
          >
            <Checkbox checked={false}>show Chasis Number</Checkbox>
          </Form.Item>
          <Form.Item
            name="showEngineNumber"
            lable="showEngineNumber"
            valuePropName="checked"
          >
            <Checkbox checked={false}>show Engine Number </Checkbox>
          </Form.Item>
          <Form.Item name="showGST" lable="Show GST" valuePropName="checked">
            <Checkbox checked={false}>Show GST</Checkbox>
          </Form.Item>
          <Form.Item
            name="extendAuctionForLessBid"
            lable="extend Auction For Less Bid"
            valuePropName="checked"
          >
            <Checkbox checked={false}>extend Auction For Less Bid</Checkbox>
          </Form.Item>
          <Form.Item
            name="showVehiclesWithoutLogin"
            lable="show Vehicles Without Login"
            valuePropName="checked"
          >
            <Checkbox checked={false}>show Vehicles Without Login</Checkbox>
          </Form.Item>
          <Form.Item
            name="auctionViewOnly"
            lable="auction View Only"
            valuePropName="checked"
          >
            <Checkbox checked={false}>auction View Only</Checkbox>
          </Form.Item>
          <Form.Item
            name="onlyPCCBuyersAllowed"
            lable="only PCC Buyers Allowed"
            valuePropName="checked"
          >
            <Checkbox>Only PCC Buyers Allowed</Checkbox>
          </Form.Item>
          <Form.Item
            name="showTNC"
            lable="only PCC Buyers Allowed"
            valuePropName="checked"
          >
            <Checkbox>show Terms and Conditions</Checkbox>
          </Form.Item>
          <Form.Item
            name="showVehicleDownload"
            lable="showEngineNumber"
            valuePropName="checked"
          >
            <Checkbox checked={false}>showVehicleDownload </Checkbox>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
