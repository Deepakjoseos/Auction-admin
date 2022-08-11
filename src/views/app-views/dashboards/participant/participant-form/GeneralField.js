import React, { useState } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  Select,
  TreeSelect,
  Space,
  Button,
  Image,
  Tag,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import Editor from 'components/shared-components/Editor'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { TweenOneGroup } from 'rc-tween-one'

// const { Dragger } = Upload
const { Option } = Select

const SITE_NAME = process.env.REACT_APP_SITE_NAME

const rules = {
  name: [
    {
      required: true,
      message: 'Required',
    },
  ],
  email: [
    {
      required: true,
      message: 'Required',
    },
  ],
  password: [
    {
      required: true,
      message: 'Required',
    },
  ],
  contact: [
    {
      required: true,
      message: 'Required',
    },
  ],

  acquiredById: [
    {
      required: true,
      message: 'Required',
    },
  ],
  contactPerson: [
    {
      required: true,
      message: 'Required',
    },
  ],
  gst: [
    {
      required: true,
      message: 'Required',
    },
  ],

  hdfcPanValidation: [
    {
      required: true,
      message: 'Required',
    },
  ],
  pan: [
    {
      required: true,
      message: 'Required',
    },
  ],

  parentId: [
    {
      required: true,
      message: 'Required',
    },
  ],
  participantType: [
    {
      required: true,
      message: 'Required',
    },
  ],
  pcc: [
    {
      required: true,
      message: 'Required',
    },
  ],
  phone: [
    {
      required: true,
      message: 'Required',
    },
  ],

  address: [
    {
      required: true,
      message: 'Required',
    },
  ],
  city: [
    {
      required: true,
      message: 'Required',
    },
  ],
  pincode: [
    {
      required: true,
      message: 'Required',
    },
  ],
  state: [
    {
      required: true,
      message: 'Required',
    },
  ],
  relationshipManagerId: [
    {
      required: true,
      message: 'Required',
    },
  ],
  userType: [
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
  //   buyerEligibleBuisness: [
  //     {
  //       required: true,
  //       message: 'Required',
  //     },
  //   ],
  participantClient: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({
  subAdmins,
  participants,
  mode,
  setIsBuyer,
  isBuyer,
}) => {
  const [image, setImage] = useState(false)

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={rules.email}>
            <Input placeholder="Email" />
          </Form.Item>
          {mode === 'ADD' && (
            <Form.Item label="Password" name="password" rules={rules.password}>
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item name="contact" label="Contact" rules={rules.contact}>
            <Input placeholder="Contact" />
          </Form.Item>
          <Form.Item name="gst" label="GST" rules={rules.gst}>
            <Select placeholder="GST">
              <Option value={false}>No</Option>
              <Option value={true}>Yes</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="hdfcPanValidation"
            label="HdfcPanValidation"
            rules={rules.hdfcPanValidation}
          >
            <Select placeholder="HdfcPanValidation">
              <Option value={false}>No</Option>
              <Option value={true}>Yes</Option>
            </Select>
          </Form.Item>
          <Form.Item name="pan" label="Pan number" rules={rules.pan}>
            <Input placeholder="Pan Number" />
          </Form.Item>
          <Form.Item
            name="relationshipManagerId"
            label="Relationship Manager"
            //   rules={rules.relationshipManagerId}
          >
            <Select placeholder="Relationship Manager">
              {subAdmins.map((subAdmin) => (
                <Option value={subAdmin._id}>{subAdmin.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="userType" label="User Type" rules={rules.userType}>
            <Select placeholder="User Type">
              <Option value="Employee">Employee</Option>
              <Option value="NonEmployee">Non Employee</Option>
            </Select>
          </Form.Item>
          {/* {isEmployee && (
            <Form.Item name="parentId" label="Parent">
              <Select placeholder="Parent">
                {participants.map((user) => (
                  <Option value={user._id}>{user.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )} */}
          <Form.Item name="pcc" label="PCC" rules={rules.pcc}>
            <Select placeholder="Pcc">
              <Option value={false}>No</Option>
              <Option value={true}>Yes</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="participantType"
            label="participantType"
            rules={rules.participantType}
          >
            <Select
              placeholder="participantType"
              onChange={(e) => setIsBuyer(e === 'Buyer' ? true : false)}
            >
              <Option value="Seller">Seller</Option>
              <Option value="Buyer">Buyer</Option>
            </Select>
          </Form.Item>
          {isBuyer && (
            <Form.Item
              name="buyerEligibleBuisness"
              label="Buyer Eligible business type"
              // rules={rules.buyerEligibleBuisness}
            >
              <Select placeholder="Buyer Eligible business type">
                <Option value={'Bank'}>Bank</Option>
                <Option value={'Consumer'}>Consumer</Option>
                <Option value={'Insurance'}>Insurance</Option>
              </Select>
            </Form.Item>
          )}

          {mode === 'EDIT' && (
            <Form.Item name="status" label="Status" rules={rules.status}>
              <Select placeholder="Status">
                <Option value="Active">Active</Option>
                <Option value="Hold">Hold</Option>
              </Select>
            </Form.Item>
          )}
          <Form.Item
            name="participantClient"
            label="Participant Client"
            // rules={rules.participantClient}
          >
            <Input placeholder="Participant Client" />
          </Form.Item>
        </Card>
        <Card title="Contact Person">
          <Form.Item name="contact_person_name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="contact_person_phone"
            label="Phone"
            rules={rules.phone}
          >
            <Input placeholder="phone" />
          </Form.Item>
        </Card>
        <Card title="Permanent Address">
          <Form.Item
            name="permanent_address"
            label="Address"
            rules={rules.address}
          >
            <Input placeholder="address" />
          </Form.Item>
          <Form.Item name="permanent_city" label="City" rules={rules.city}>
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item
            name="permanent_pincode"
            label="Pincode"
            rules={rules.pincode}
          >
            <Input placeholder="Pincode" />
          </Form.Item>
          <Form.Item name="permanent_state" label="State" rules={rules.state}>
            <Input placeholder="State" />
          </Form.Item>
        </Card>
        <Card title="Office Address">
          <Form.Item
            name="office_address"
            label="Address"
            rules={rules.address}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item name="office_city" label="City" rules={rules.city}>
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item
            name="office_pincode"
            label="Pincode"
            rules={rules.pincode}
          >
            <Input placeholder="Pincode" />
          </Form.Item>
          <Form.Item name="office_state" label="State" rules={rules.state}>
            <Input placeholder="State" />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  )
}

export default GeneralField
