import React from "react";
import { Input, Row, Col, Card, Form, Upload, Select } from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";

// const { Dragger } = Upload
const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: "Required",
    },
  ],
  logo: [
    {
      required: true,
      message: "Required",
    },
  ],
  brandId: [
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
  brandVariantId: [
    {
      required: true,
      message: "Required",
    },
  ],
};

const GeneralField = ({ brands, propsImages, formMode }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item>
          {formMode === "ADD" && (
            <Form.Item name="brandId" label="Brand" rules={rules.brandId}>
              <Select placeholder="Select Brand">
                {brands.map((brand) => (
                  <Option disabled={brand.status === "HOLD"} value={brand._id}>
                    {brand.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {formMode === "EDIT" && (
            <Form.Item name="status" label="Status" rules={rules.status}>
              <Select placeholder="Status">
                <Option value="Active">Active</Option>
                <Option value="Hold">Hold</Option>
              </Select>
            </Form.Item>
          )}
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Upload listType="picture-card" name="logo" {...propsImages}>
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
