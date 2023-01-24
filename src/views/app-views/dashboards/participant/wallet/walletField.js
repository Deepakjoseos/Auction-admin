import React, { useEffect, useState } from 'react';
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
  DatePicker,
  Table,
  Menu,
  Modal,
  List
} from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import utils from 'utils';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import feeTypeService from 'services/FeeType';
import registrationService from 'services/registration';
import moment from 'moment';
import participantService from 'services/Participant';
import BuyingLimitList from '../list-buying-limit';

// const { Dragger } = Upload

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

const WalletField = ({ participantId, onFinish }) => {
  console.log('participant', participantId);
  console.log('onFinish', onFinish);

  // const initialValues = {
  //     participantId: currentParticipant._id,

  //   };
  // console.log(onFinish,"testing onFinish")
  const [registrationsList, setRegistrationsList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [feeTypes, setFeeType] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [list, setList] = useState([]);
  const [wallet, setWallet] = useState({});

  useEffect(() => {
    console.log('hiwallet');
    const getParticipant = async () => {
      const data = await participantService.getParticipantById(participantId);
      console.log('participant', data);
      if (data) {
        // const wallets = data.filter((dat) => dat?.wallet);
        // setList(wallets);
        // setSearchBackupList(wallets);
        // console.log(wallets, "show-data");
        setWallet(data.wallet);
        console.log('walletdata', data.wallet);
      }
    };
    getParticipant();
  }, []);

  return (
    <>
      {/*         
            {list?.length > 0 ?

                <Table className="table-responsive" columns={tableColumns} dataSource={list} rowKey="id" /> : ""} */}
      <Row gutter={16}>
        <Col xs={24} sm={24} md={30}>
          <Card title="Basic Info">
            <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem' }}>
              <Form.Item
                name="amount"
                label="Limit Amount"
                rules={rules.amount}
              >
                <InputNumber placeholder="Amount" min={0} />
              </Form.Item>

              <Form.Item name="remark" label="Remark" rules={rules.remark}>
                <Input placeholder="Remark" />
              </Form.Item>
              {/* <Form.Item
                                name="participant"
                                label="Participant"
                                rules={rules.participant}
                            >
                                <Input placeholder="Participant" disabled />
                            </Form.Item> */}
            </div>
            <Button
              type="primary"
              htmlType="button"
              style={{ float: 'right' }}
              onClick={onFinish}
            >
              Update
            </Button>
          </Card>
        </Col>
      </Row>
      {wallet ? (
        <List>
          <List.Item>
            <Card title="Balance">{wallet?.balance}</Card>

            <Card title="Security Deposit">{wallet?.securityDeposit}</Card>

            <Card title="Initial Buying Limit">
              {wallet?.initialBuyingLimit}
            </Card>

            <Card title="Current Buying Limit">
              {wallet?.currentBuyingLimit}
            </Card>

            <Card title="Used Buying Limit">{wallet?.usedBuyingLimit}</Card>
            {/* <Card title="Buying limit history">
              {wallet?.historyBuyingLimit}
            </Card> */}

            {/* <Card title="Blocked Buying Limit">{wallet?.blockedAmount}</Card> */}
          </List.Item>
        </List>
      ) : (
        ''
      )}
      <BuyingLimitList participantId={participantId} />
      {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
    </>
  );
};

export default WalletField;
