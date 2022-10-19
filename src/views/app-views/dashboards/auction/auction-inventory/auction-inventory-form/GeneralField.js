import React from 'react';
import {
  Button,
  Upload,
  Select,
  Form,
  Col,
  Row,
  Card,
  Input,
  InputNumber,
  DatePicker,
  Checkbox
} from 'antd';
import Icon from 'components/util-components/Icon';
const { Option } = Select;

const rules = {
  auctionId: [
    {
      required: true,
      message: 'Required'
    }
  ],
  name: [
    {
      required: true,
      message: 'Required'
    }
  ],
  image: [
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
  url: [
    {
      required: true,
      message: 'Required'
    }
  ],
  registrationNumber: [
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
  setSheet,
  auctions,
  mode,
  setAuctionId,
  cities,
  brands,
  brandVariants,
  fuelTypes,
  InsuranceType
}) => {
  const onImportExcel = ({ fileList }) => {
    if (fileList.length === 1) setSheet(fileList[0]);
  };


  const renderFormInputs = () => {
    if (mode === 'ADD') {
      return (
        <div style={{ margin: 100, marginTop: '20px' }}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={17}>
              <Card title="Upload Auction Inventory">
                <Form.Item
                  name="auctionId"
                  label="Auction"
                  rules={rules.auctionId}
                >
                  <Select
                    style={{ minWidth: '120px', marginBottom: '10px' }}
                    placeholder="Select Auction"
                  >
                    {auctions?.map((auction) => (
                      <Option
                        value={auction._id}
                        disabled={auction.status === 'Hold'}
                      >
                        {auction.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Upload.Dragger
                  multiple={false}
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={onImportExcel}
                  showUploadList={{ showRemoveIcon: false }}
                  beforeUpload={() => false}
                >
                  <Button className="upload-wrap">
                    <Icon type="upload" />
                    <span className="upload-text">Drag/Upload Excel File</span>
                  </Button>
                </Upload.Dragger>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }

    if (mode === 'EDIT') {
      return (
        <Row gutter={16}>
          <Col xs={24} sm={24} md={17}>
            <Card title="Edit Auction Inventory">
              <Form.Item
                name="registrationNumber"
                label="Registration Number"
                rules={rules.required}
              >
                <Input placeholder="Registration Number" />
              </Form.Item>
              <Form.Item
                name="reservedPrice"
                label="Reserved Price"
                rules={rules.required}
              >
                <InputNumber
                  placeholder="reservedPrice"
                  size="large"
                  min={0}
                  max={1000000}
                />
              </Form.Item>
              <Form.Item name="parkingLocation" label="Parking Location">
                <Select placeholder="Parking Location">
                  {cities.map((city) => (
                    <Option key={city._id} value={city.name}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="yardLocation" label="Yard Location">
                <Select placeholder="Yard Location">
                  {cities.map((city) => (
                    <Option key={city._id} value={city.name}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="repoDatee" label="Repo Date">
                <DatePicker />
              </Form.Item>
              <Form.Item name="endorsementRCBook" label="Endorsement RCBook">
                <Input placeholder="Endorsement RCBook" />
              </Form.Item>
              <Form.Item name="area" label="Area">
                <Input placeholder="Area" />
              </Form.Item>
              {/* registrationInfo */}
              <Form.Item
                name='registrationDatee'
                label="Registration Date"
                rules={rules.required}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="registrationType"
                label="Registration Type"
                rules={rules.required}
              >
                <Select placeholder="Registration Type">
                  <Option key={'Commercial'} value={'Commercial'}>
                    {'Commercial'}
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="registrationYear"
                label="Registration Year"
                rules={rules.required}
              >
                <InputNumber
                  placeholder="Registration Year"
                  size="large"
                  min={1998}
                  max={new Date().getFullYear()}
                />
              </Form.Item>
              {/* vehicleInfo */}
              <Form.Item name="make" label="Make" rules={rules.required}>
                <Select placeholder="Make">
                  {brands.map((brand) => (
                    <Option key={brand._id} value={brand.name}>
                      {brand.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="model" label="Model" rules={rules.required}>
                <Select placeholder="Model">
                  {brandVariants.map((brand) => (
                    <Option key={brand._id} value={brand.name}>
                      {brand.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="version" label="Version" rules={rules.required}>
                <Input placeholder="Version" />
              </Form.Item>
              <Form.Item
                name="chasisNumber"
                label="Chasis Number"
                rules={rules.required}
              >
                <Input placeholder="Chasis Number" />
              </Form.Item>
              <Form.Item
                name="engineNumber"
                label="Engine Number"
                rules={rules.required}
              >
                <Input placeholder="Engine Number" />
              </Form.Item>
              <Form.Item name="color" label="Color">
                <Input placeholder="Color" />
              </Form.Item>
              <Form.Item
                name="kmReading"
                label="Km Reading"
                rules={rules.required}
              >
                <InputNumber placeholder="Km Reading" size="large" min={0} />
              </Form.Item>
              <Form.Item
                name="keyStatus"
                label="Key Status"
                rules={rules.required}
              >
                <InputNumber placeholder="Key Status" size="large" min={0} />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={rules.required}
              >
                <Select placeholder="Fuel Type">
                  {fuelTypes.map((type) => (
                    <Option key={type._id} value={type.name}>
                      {type.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="shape" label="Shape">
                <Input placeholder="Shape" />
              </Form.Item>
              <Form.Item name="gearBox" label="GearBox">
                <Input placeholder="GearBox" />
              </Form.Item>
              <Form.Item name="condition" label="Condition">
                <Input placeholder="Condition" />
              </Form.Item>
              <Form.Item name="doorCount" label="Door Count">
                <InputNumber placeholder="Door Count" size="large" min={0} />
              </Form.Item>
              <Form.Item
                name="mfgMonth"
                label="mfg Month"
                rules={rules.required}
              >
                <InputNumber
                  placeholder="mfg Month"
                  size="large"
                  min={1}
                  max={12}
                />
              </Form.Item>
              <Form.Item name="mfgYear" label="mfg Year" rules={rules.required}>
                <InputNumber
                  placeholder="mfg Year"
                  size="large"
                  min={1998}
                  max={new Date().getFullYear()}
                />
              </Form.Item>




              <Form.Item name="insuranceType" label="insuranceType" >
              <Select placeholder="insuranceType">
                {InsuranceType?.InsuranceType?.map((item, index) => ( 
                  <Option key={index} value={item}> {item} </Option>
                ))}
              </Select>
            </Form.Item>



              <Form.Item
                name={'insuranceExpiryDatee'}
                label="Insurance Expiry Date"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item name="noClaimBonus" label="No Claim Bonus">
                <Input placeholder="No Claim Bonus" />
              </Form.Item>
              <Form.Item
                name="noClaimBonusPercentage"
                label="No Claim Bonus Percentage"
              >
                <InputNumber
                  placeholder="No Claim Bonus Percentage"
                  size="large"
                  min={0}
                  max={100}
                />
              </Form.Item>
              {/* taxInfo */}
              <Form.Item name="paid" label="Tax Paid">
                <Input placeholder="Tax Paid" />
              </Form.Item>
              <Form.Item name="rtoTaxDatee" label="Tax Date">
                <DatePicker />
              </Form.Item>
              <Form.Item name="taxType" label="Tax Type">
                <Input placeholder="Tax Type" />
              </Form.Item>
              <Form.Item name="validity" label="Tax validity">
                <Input placeholder="Tax validity" />
              </Form.Item>
              {/* rtoInfo */}
              <Form.Item name="currentRTOlocation" label="Current RTO location">
                <Input placeholder="current RTO location" />
              </Form.Item>
              <Form.Item name="lastRTODatee" label="Last RTO Date">
                <DatePicker />
              </Form.Item>
              <Form.Item name="lastRTOLocation" label="Last RTO location">
                <Input placeholder="Last RTO location" />
              </Form.Item>

              <Form.Item name="status" label="Status" rules={rules.status}>
                <Select placeholder="Status">
                  <Option value="Active">Active</Option>
                  <Option value="Hold">Hold</Option>
                </Select>
              </Form.Item>
              {/* CheckBoxes */}
              <Form.Item name="hypothecation" valuePropName="checked">
                <Checkbox>Hypothecation</Checkbox>
              </Form.Item>
              <Form.Item name="rcAvailable" valuePropName="checked">
                <Checkbox>Rc Available</Checkbox>
              </Form.Item>
              <Form.Item
                name="insuranceInfo_Availability"
                valuePropName="checked"
              >
                <Checkbox>Availability</Checkbox>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      );
    }
  };

  return renderFormInputs();
};

export default GeneralField;
