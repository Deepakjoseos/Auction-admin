import React from 'react';
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
  DatePicker
} from 'antd';

import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon';

// const { Dragger } = Upload
const { Option } = Select;

const SITE_NAME = process.env.REACT_APP_SITE_NAME;

const rules = {
  status: [
    {
      required: true,
      message: 'Required'
    }
  ],
  // countedIn: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  date: [
    {
      required: true,
      message: 'Required'
    }
  ],
  fee: [
    {
      required: true,
      message: 'Required'
    }
  ],

  feeRemark: [
    {
      required: true,
      message: 'Required'
    }
  ],
  feeTypeId: [
    {
      required: true,
      message: 'Required'
    }
  ],
  mode: [
    {
      required: true,
      message: 'Required'
    }
  ],

  note: [
    {
      required: true,
      message: 'Required'
    }
  ],
  participantId: [
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
  branchName: [
    {
      required: true,
      message: 'Required'
    }
  ],
  number: [
    {
      required: true,
      message: 'Required'
    }
  ],
  phone: [
    {
      required: true,
      message: 'Required'
    }
  ],

  receipt: [
    {
      required: true,
      message: 'Required'
    }
  ],
  paymentDate: [
    {
      required: true,
      message: 'Required'
    }
  ]
};
// const getStockStatus = (status) => {
//   if (status === 'Active') {
//     return (
//       <>
//         <Tag color="green">Active</Tag>
//       </>
//     )
//   }
//   if (status === 'Hold') {
//     return (
//       <>
//         <Tag color="red">Hold</Tag>
//       </>
//     )
//   }

//   if (status === 'Deleted') {
//     return (
//       <>
//         <Tag color="red">Deleted</Tag>
//       </>
//     )
//   }
//   return null
// }

const RegistrationField = ({
  onFinish,
  feeTypes,
  status,
  propsImages,
  participantId
}) => {
  // const initialValues = {
  //     participantId: currentParticipant._id,

  //   };
  // console.log(onFinish,"testing onFinish")

  // const [selectedRows, setSelectedRows] = useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // if (registrations) {
  //   setRegistrationsList(registrations);
  //   setSearchBackupList(registrations);
  // }

  // const findFeeTypeName = (rowId) => {
  //   console.log('rowId', rowId);
  //   const n = feeTypes.find((e) => e.id === rowId);
  //   console.log('n', n);
  //   return n?.name ? n.name : '-';
  // };

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={17}>
          {/* <Form initialValues={initialValues}>  */}
          <Card title="Basic Info">
            <Form.Item
              name="feeRemark"
              label="FeeRemark"
              placeholder="FeeRemark"
              rules={rules.feeRemark}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="countedIn"
              label="CountedIN"
              rules={rules.countedIn}
              placeholder="CountedIn"
            >
              <DatePicker className="board-card-modal date-picker w-100" />
            </Form.Item>
            <Form.Item
              label="Registration Date"
              name="date"
              rules={rules.date}
              placeholder="Registration date"
            >
              <DatePicker className="board-card-modal date-picker w-100" />
            </Form.Item>
            <Form.Item
              label="Registration Expiry Date"
              name="expiry"
              rules={rules.expiry}
              placeholder="Registration Expiry Date"
            >
              <DatePicker className="board-card-modal date-picker w-100" />
            </Form.Item>
            {/* <Form.Item
              name="status"
              label="Status"
              rules={rules.status}
              placeholder="Status"
            >
              <Select>
                {status.map((status) => (
                  <Option value={status}>{status}</Option>
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item
              name="mode"
              label="Mode"
              rules={rules.mode}
              placeholder="Mode"
            >
              <Select>
                <Option value="Wallet">Wallet</Option>
                <Option value="RTGS">RTGS</Option>
                <Option value="Cash">Cash</Option>
                <Option value="Cheque">Cheque</Option>
                <Option value="DD">DD</Option>
                <Option value="NEFT">NEFT</Option>
                <Option value="Card">Card</Option>
                <Option value="PayTm">PayTm</Option>
                <Option value="TEMP ">TEMP </Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Notes"
              name="note"
              rules={rules.note}
              placeholder="Notes"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Payment Date"
              name="paymentDate"
              rules={rules.paymentDate}
              placeholder="Payment Date"
            >
              <DatePicker className="board-card-modal date-picker w-100" />
            </Form.Item>
            <Form.Item
              name="fee"
              label="Fee"
              rules={rules.fee}
              placeholder="Fee"
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="feeType"
              label="Fee Type"
              rules={rules.feeTypeId}
              placeholder="Fee Type"
            >
              <Select>
                {feeTypes.map((feeType) => (
                  <Option value={feeType}>
                    {feeType.split('_').join(' ')}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {/* <Form.Item name="FeeType" label="FeeType" >
              <Select placeholder="FeeType">
                {feeTypes?.FeeType?.map((item, index) => ( 
                  <Option key={index} value={item}> {item} </Option>
                ))}
              </Select>
            </Form.Item> */}
            {/* <Form.Item
            name="participantId"
            label="Participant"
            rules={rules.participantId}
            value={currentParticipant._id}
            placeholder='CurrentParticipant'
          >
         <Input />
          </Form.Item> */}
          </Card>

          <Card title="Payment">
            <Form.Item
              name="bankName"
              label="Bank Name"
              rules={rules.bankName}
              placeholder="Bank Name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="branchName"
              label="Branch Name"
              rules={rules.branchName}
              placeholder="Branch Name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="number"
              label="Number"
              rules={rules.number}
              placeholder="Number/id of doucument involved in payment eg - DD no., Cheque no"
            >
              <Input />
            </Form.Item>
            {/* <Form.Item
              name="receipt"
              label="Reciept"
              rules={rules.state}
              placeholder="Receipt image URL"
            >
              <Input />
            </Form.Item> */}
          </Card>
          <Col xs={24} sm={24} md={7}>
            <Card title="Receipt">
              <Upload listType="picture-card" name="logo" {...propsImages}>
                <CustomIcon className="display-3" svg={ImageSvg} />
              </Upload>
            </Card>
          </Col>
          <Button
            type="primary"
            htmlType="button"
            style={{ float: 'right' }}
            onClick={onFinish}
          >
            Add
          </Button>

          {/* </Form>  */}
        </Col>
      </Row>
    </>
  );
};

export default RegistrationField;
