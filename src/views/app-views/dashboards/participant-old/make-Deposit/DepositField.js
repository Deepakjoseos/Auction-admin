import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Button,
  Upload
} from 'antd';
import utils from 'utils';
import { Table } from 'antd';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import depositService from 'services/deposit';

import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon';

const { Option } = Select;

const rules = {
  participantId: [
    {
      required: true,
      message: 'Required'
    }
  ],

  paymentMode: [
    {
      required: true,
      message: 'Required'
    }
  ],
  amount: [
    {
      required: true,
      message: 'Required'
    }
  ],
  remark: [
    {
      required: true,
      message: 'Required'
    }
  ],
  date: [
    {
      required: true,
      message: 'Required'
    }
  ],
  countedIn: [
    {
      required: true,
      message: 'Required'
    }
  ],
  bankName: [
    {
      required: true,
      message: 'Required'
    }
  ],
  bankBranch: [
    {
      required: true,
      message: 'Required'
    }
  ],
  receiptNumber: [
    {
      required: true,
      message: 'Required'
    }
  ],
  businessType: [
    {
      required: true,
      message: 'Required'
    }
  ],
  recieptUrl: [
    {
      required: true,
      message: 'Required'
    }
  ]
};

const DepositField = ({
  paymentModes,
  onFinish,
  submitLoading,
  buyerEligibleBuisness,
  propsImages
}) => {
  let history = useHistory();

  const makeDeposit = () => {
    history.push(`/app/dashboards/deposit/make-deposit`);
  };

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={17}>
          <Card title="Basic Info">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              {/*               
              <Form.Item
                name="participantId"
                label="Participant Id"
                rules={rules.participantId}
              >
                <Input placeholder={params?.id} value={params?.id} disabled />
              </Form.Item>
 */}

              {/* <Form.Item name="participantId" label="Participant">
                <Input placeholder={participantId} disabled />
              </Form.Item> */}

              <Form.Item
                name="paymentMode"
                label="Payment Mode"
                rules={rules.paymentMode}
              >
                <Select placeholder="Payment Mode">
                  {paymentModes.map((paymentMode) => (
                    <Option value={paymentMode}>{paymentMode}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="amount" label="Amount" rules={rules.amount}>
                <InputNumber min={0} defaultValue={0.0} />
              </Form.Item>
              <Form.Item name="remark" label="Remark" rules={rules.remark}>
                <Input placeholder="Remark" />
              </Form.Item>
              <Form.Item
                name="businessType"
                label="Business Type"
                rules={rules.businessType}
              >
                <Select placeholder="Business Type">
                  {buyerEligibleBuisness.map((type) => (
                    <Option value={type}>{type}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="date" label="Date" rules={rules.date}>
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="countedIn"
                label="Counted In"
                rules={rules.countedIn}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="bankName"
                label="Bank Name"
                rules={rules.bankName}
              >
                <Input placeholder="Bank Name" />
              </Form.Item>
              <Form.Item
                name="bankBranch"
                label="Bank Branch"
                rules={rules.bankBranch}
              >
                <Input placeholder="Bank Branch" />
              </Form.Item>
              <Form.Item
                name="receiptNumber"
                label="Receipt Number"
                rules={rules.receiptNumber}
              >
                <Input placeholder="Receipt Number" />
              </Form.Item>
              {/* <Form.Item
                name="recieptUrl"
                label="Reciept"
                rules={rules.recieptUrl}
              >
                <Input placeholder="Reciept" />
              </Form.Item> */}
            </div>
          </Card>
          <Col xs={24} sm={24} md={7}>
            <Card title="Receipt">
              <Form.Item name="logo" rules={rules.receiptNumber}>
                <Upload listType="picture-card" name="logo" {...propsImages}>
                  <CustomIcon className="display-3" svg={ImageSvg} />
                </Upload>
              </Form.Item>
            </Card>
          </Col>
          <Button
            type="primary"
            onClick={onFinish}
            htmlType="submit"
            style={{ float: 'right' }}
            loading={submitLoading}
          >
            Make Deposit
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default DepositField;
