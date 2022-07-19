import React from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  Select,
  TimePicker,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import moment from 'moment'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
    {
      required: true,
      message: 'Required',
    },
  ],
  startTime: [
    {
      required: true,
      message: 'Required',
    },
  ],
  drawTime: [
    {
      required: true,
      message: 'Required',
    },
  ],
  editTime: [
    {
      required: true,
      message: 'Required',
    },
  ],
  status: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = (props) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={24}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" rules={rules.name}>
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item name="startTime" label="Start Time" rules={rules.startTime}>
          <TimePicker format={'HH:mm'} />
        </Form.Item>

        <Form.Item name="drawTime" label="Draw Time" rules={rules.drawTime}>
          <TimePicker format={'HH:mm'} />
        </Form.Item>

        <Form.Item name="editTime" label="Edit Time" rules={rules.editTime}>
          <TimePicker format={'HH:mm'} />
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
)

export default GeneralField
