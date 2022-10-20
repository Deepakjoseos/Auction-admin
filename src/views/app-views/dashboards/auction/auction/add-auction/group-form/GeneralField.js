import React, { useEffect, useState } from 'react';
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
  Upload,
  Button
} from 'antd';
import Icon from 'components/util-components/Icon';
import fileManagerService from 'services/FileManager';
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
  ],
  required: [
    {
      required: true,
      message: 'Required'
    }
  ]
};

const GeneralField = ({
  vehicleTypes,
  regions,
  cities,
  clients,
  participant,
  setImageUrl,
  imageUrl
}) => {
  // const [citys, setCitys] = useState([]);
  // const [regions, setRegions] = useState([]);
  // const [vehicleType, setVehicleType] = useState([]);
  // const [clients, setClients] = useState([]);\
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (imageUrl) {
      setImages([
        {
          uid: 1,
          name: 'image.png',
          status: 'done',
          url: imageUrl
        }
      ]);
    }
  }, [imageUrl, setImages]);

  const onImportImage = async ({ fileList }) => {
    if (fileList.length > 0) {
      const imageUrl = await fileManagerService.getImageUrl(
        fileList[fileList.length - 1].originFileObj
      );
      setImageUrl(imageUrl);
    }
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item label="Upload image" rules={rules.required}>
            <Upload.Dragger
              multiple={false}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={onImportImage}
              beforeUpload={() => false}
              listType="picture-card"
              fileList={images}
              showUploadList={{ showPreviewIcon: false }}
            >
              <Button className="upload-wrap">
                <Icon type="upload" />
                <span className="upload-text">Drag/Upload Image File</span>
              </Button>
            </Upload.Dragger>
          </Form.Item>

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

          <Form.Item name="incrementAmount" label="IncrementAmount">
            <InputNumber
              placeholder="incrementAmount"
              size="large"
              min={0}
              max={100000}
            />
          </Form.Item>

          <Form.Item
            name="vehicleTypeId"
            label="Vehicle Type"
            // rules={rules.status}
          >
            <Select placeholder="Vehicle Type">
              {vehicleTypes.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="cityId" label="City">
            <Select placeholder="City">
              {cities.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="regionId" label="Region">
            <Select placeholder="Region">
              {regions.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="clientId" label="Client">
            <Select placeholder="Client">
              {clients.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="sellerId" label="sellerId">
            <Select placeholder="seller">
              {participant.map((participant) => (
                <Option key={participant._id} value={participant._id}>
                  {participant.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="type" label="Type">
            <Select placeholder="Type">
              <Option value="Yard">Yard</Option>
              <Option value="Online">Online</Option>

              {/* <Option value="Open">Open</Option> */}
            </Select>
          </Form.Item>
          <Form.Item name="format" label="Format">
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
            <Input type={'number'} />
          </Form.Item>
          <Form.Item
            name="termsAndConditions"
            label="Terms And Conditions"
            rules={rules.status}
          >
            <Input type={'text'} />
          </Form.Item>
          <Form.Item
            name={'startTimestamp'}
            label="Start Date"
            rules={rules.status}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name={'endTimestamp'}
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
            <Checkbox>Show Reg Number</Checkbox>
          </Form.Item>
          <Form.Item
            name="showChasisNumber"
            lable="show Chasis Number"
            valuePropName="checked"
          >
            <Checkbox>show Chasis Number</Checkbox>
          </Form.Item>
          <Form.Item
            name="showEngineNumber"
            lable="showEngineNumber"
            valuePropName="checked"
          >
            <Checkbox>show Engine Number </Checkbox>
          </Form.Item>
          <Form.Item name="showGST" lable="Show GST" valuePropName="checked">
            <Checkbox>Show GST</Checkbox>
          </Form.Item>
          <Form.Item
            name="extendAuctionForLessBid"
            lable="extend Auction For Less Bid"
            valuePropName="checked"
          >
            <Checkbox>extend Auction For Less Bid</Checkbox>
          </Form.Item>
          <Form.Item
            name="showVehiclesWithoutLogin"
            lable="show Vehicles Without Login"
            valuePropName="checked"
          >
            <Checkbox>show Vehicles Without Login</Checkbox>
          </Form.Item>
          <Form.Item
            name="auctionViewOnly"
            lable="auction View Only"
            valuePropName="checked"
          >
            <Checkbox>auction View Only</Checkbox>
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
            <Checkbox>show Vehicle Download </Checkbox>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
