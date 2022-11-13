import React, { useState } from 'react';
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
  Tag
} from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon';
import Editor from 'components/shared-components/Editor';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';

// const { Dragger } = Upload
const { Option } = Select;

const SITE_NAME = process.env.REACT_APP_SITE_NAME;

const rules = {
  name: [
    {
      required: true,
      message: 'Required'
    }
  ],
  email: [
    {
      required: true,
      message: 'Required'
    }
  ],
  password: [
    {
      required: true,
      message: 'Required'
    }
  ],
  contact: [
    {
      required: true,
      message: 'Required',
      min: 10,
      max: 10
    }
  ],

  acquiredById: [
    {
      required: true,
      message: 'Required'
    }
  ],
  contactPerson: [
    {
      required: true,
      message: 'Required'
    }
  ],
  gst: [
    {
      required: true,
      message: 'Required'
    }
  ],

  hdfcPanValidation: [
    {
      required: true,
      message: 'Required'
    }
  ],
  pan: [
    {
      required: true,
      message: 'Required'
    }
  ],

  parentId: [
    {
      required: true,
      message: 'Required'
    }
  ],
  participantType: [
    {
      required: true,
      message: 'Required'
    }
  ],
  pcc: [
    {
      required: true,
      message: 'Required'
    }
  ],
  phone: [
    {
      required: true,
      message: 'Required',
      min: 10,
      max: 10
    }
  ],

  address: [
    {
      required: true,
      message: 'Required'
    }
  ],
  city: [
    {
      required: true,
      message: 'Required'
    }
  ],
  pincode: [
    {
      required: true,
      message: 'Required'
    }
  ],
  state: [
    {
      required: true,
      message: 'Required'
    }
  ],
  relationshipManagerId: [
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
  //   buyerEligibleBuisness: [
  //     {
  //       required: true,
  //       message: 'Required',
  //     },
  //   ],
  participantClient: [
    {
      required: true,
      message: 'Required'
    }
  ]
};

const GeneralField = ({
  subAdmins,
  participants,
  participant,
  mode,
  setIsBuyer,
  isBuyer,
  clients,
  buyerEligibleBuisness,
  usertype,
  states
}) => {
  const [image, setImage] = useState(false);

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
            label="HDFC PAN Validation"
            rules={rules.hdfcPanValidation}
          >
            <Select placeholder="HDFC PAN Validation">
              <Option value={false}>No</Option>
              <Option value={true}>Yes</Option>
            </Select>
          </Form.Item>
          <Form.Item name="pan" label="PAN Number" rules={rules.pan}>
            <Input placeholder="PAN Number" />
          </Form.Item>
          <Form.Item
            name="clientId"
            label="Participant Client"
            //   rules={rules.relationshipManagerId}
          >
            <Select placeholder="Participant Client">
              {clients.map((client) => (
                <Option value={client._id}>{client.title}</Option>
              ))}
            </Select>
          </Form.Item>

          {window.localStorage.getItem('auth_type') === 'Admin' && (
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
          )}

          <Form.Item name="pcc" label="PCC" rules={rules.pcc}>
            <Select placeholder="Pcc">
              <Option value={false}>No</Option>
              <Option value={true}>Yes</Option>
            </Select>
          </Form.Item>
          <Form.Item name="UserType" label="User Type">
            <Select placeholder="User Type">
              {usertype?.UserType?.map((item, index) => (
                <Option key={index} value={item}>
                  {' '}
                  {item}{' '}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="ParticipantType" label="Participant Type">
            <Select placeholder="Participant Type" disabled={mode === 'EDIT'}>
              {participant?.ParticipantType?.map((item, index) => (
                <Option key={index} value={item}>
                  {' '}
                  {item}{' '}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="BuyerEligibleBuisness"
            label="Buyer Eligible Business"
          >
            <Select placeholder="Buyer Eligible Business">
              {buyerEligibleBuisness?.BuyerEligibleBuisness?.map(
                (item, index) => (
                  <Option key={index} value={item}>
                    {' '}
                    {item}{' '}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>

          {mode === 'EDIT' && (
            <Form.Item name="status" label="Status" rules={rules.status}>
              <Select placeholder="Status">
                <Option value="Active">Active</Option>
                <Option value="Hold">Hold</Option>
              </Select>
            </Form.Item>
          )}
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
            <Select placeholder="State">
              {states.map((item, index) => (
                <Option key={index} value={item.name}>
                  {' '}
                  {item.name}{' '}
                </Option>
              ))}
            </Select>
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
            <Select placeholder="State">
              {states.map((item, index) => (
                <Option key={index} value={item.name}>
                  {' '}
                  {item.name}{' '}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
