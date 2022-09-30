import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, Select } from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import Editor from 'components/shared-components/Editor'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
    {
      required: true,
      message: 'Required',
    },
  ],
  description: [
    {
      required: true,
      message: 'Required',
    },
  ],
  image: [
    {
      required: true,
      message: 'required',
    },
  ],
  status: [
    {
      required: true,
      message: 'Required',
    },
  ],
  priority: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({form,vehicleTypes,brands}) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={24}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" rules={rules.name}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Editor
            placeholder="Write something..."
            editorHtml={form.getFieldValue('description') || ''}
            onChange={(e) => form.setFieldsValue({ description: e })}
            name="description"
          />
        </Form.Item>
        <Form.Item name="priceRange" label="PriceRange">
          <Input placeholder="priceRange" />
        </Form.Item>
        <Form.Item name="vehicleType" label="Vehicle Type" >
            <Select placeholder="Vehicle Type">
              {vehicleTypes.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="brandId" label="Brand" rules={rules.status}>
            <Select placeholder="Brand">
              {brands.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
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
    {/* <Col xs={24} sm={24} md={7}>
      <Card title="Media">
        <Upload listType="picture-card" name="image" {...props.propsImages}>
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
      </Card>
    </Col> */}
  </Row>
)

export default GeneralField
