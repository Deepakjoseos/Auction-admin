import React, { useEffect, useState } from 'react'
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
} from 'antd'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import utils from 'utils'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import feeTypeService from 'services/FeeType'
import registrationService from 'services/registration'
import moment from 'moment'

// const { Dragger } = Upload
const { Option } = Select

const SITE_NAME = process.env.REACT_APP_SITE_NAME

const rules = {
  status: [
    {
      required: true,
      message: 'Required',
    },
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
      message: 'Required',
    },
  ],
  fee: [
    {
      required: true,
      message: 'Required',
    },
  ],

  feeRemark: [
    {
      required: true,
      message: 'Required',
    },
  ],
  feeTypeId: [
    {
      required: true,
      message: 'Required',
    },
  ],
  mode: [
    {
      required: true,
      message: 'Required',
    },
  ],

  note: [
    {
      required: true,
      message: 'Required',
    },
  ],
  participantId: [
    {
      required: true,
      message: 'Required',
    },
  ],

  bankName: [
    {
      required: true,
      message: 'Required',
    },
  ],
  branchName: [
    {
      required: true,
      message: 'Required',
    },
  ],
  number: [
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

  receipt: [
    {
      required: true,
      message: 'Required',
    },
  ],
  paymentDate: [
    {
      required: true,
      message: 'Required',
    },
  ],
}
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

const RegistrationField = ({ onFinish }) => {
  // const initialValues = {
  //     participantId: currentParticipant._id,

  //   };
  // console.log(onFinish,"testing onFinish")
  const [registrationsList, setRegistrationsList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [feeTypes, setFeeType] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  if (registrations) {
    setRegistrationsList(registrations)
    setSearchBackupList(registrations)
  }

  useEffect(() => {
    const getFeeTypes = async () => {
      const data = await feeTypeService.getFeeTypes()
      if (data) {
        setFeeType(data)
        console.log(data, 'feetypes')
      }
    }
    getFeeTypes()

    const getAllRegistrations = async () => {
      const data = await registrationService.getRegistrations()
      if (data) {
        setRegistrations(data)
      }
    }
    getAllRegistrations()
  }, [])

  const findFeeTypeName = (rowId) => {
    console.log('rowId', rowId)
    const n = feeTypes.find((e) => e.id === rowId)
    console.log('n', n)
    return n?.name ? n.name : '-'
  }
  const dropdownMenu = (row) => {
    // if (window.localStorage.getItem('auth_type') === 'Admin') {
    return (
      <Menu>
        <Menu.Item onClick={() => showModal(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Details</span>
          </Flex>
        </Menu.Item>
      </Menu>
    )
    // }
  }

  // const addBanner = () => {
  //   history.push(`/app/dashboards/banner/add-banner`)
  // }
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const viewDetails = (row) => {
    console.log('row', row)
  }

  // For deleting a row

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Fee',
      dataIndex: 'fee',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'fee'),
    },
    {
      title: 'Mode',
      dataIndex: 'mode',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'fee'),
    },
    {
      title: 'Registration Date',
      dataIndex: 'date',
      render: (date) => {
        return moment(parseInt(date)).format('L')
      },
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiry',
      render: (expiry) => {
        return moment(parseInt(expiry)).format('L')
      },
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      render: (paymentDate) => {
        return moment(parseInt(paymentDate)).format('L')
      },
    },
    {
      title: 'Fee Type',
      dataIndex: 'feeTypeId',
      key: 'feeTypeId',
      // render: (row) => {console},
      render: (_, row) => findFeeTypeName(row.feeTypeId),
    },
    // {
    //   title: 'Bank Name',
    //   dataIndex: 'payment',
    //   render: (payment) => (
    //     <Flex alignItems="center">{payment.bankName}</Flex>
    //   ),
    //   // sorter: (a, b) => a.agent.name.localeCompare(b.booking.agent.name),
    // },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ]

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value
    const searchArray = searchBackupList
    const data = utils.wildCardSearch(searchArray, value)
    setRegistrationsList(data)
    setSelectedRowKeys([])
  }

  // Filter Status Handler
  // const handleShowStatus = (value) => {
  //   if (value !== 'All') {
  //     const key = 'status'
  //     const data = utils.filterArray(searchBackupList, key, value)
  //     setRegistrationsList(data)
  //   } else {
  //     setRegistrationsList(searchBackupList)
  //   }
  // }

  // Table Filters JSX Elements
  const filters = () => (
    <Flex className="mb-1" mobileFlex={false}>
      <div className="mr-md-3 mb-3">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e)}
        />
      </div>
      {/* <div className="mb-3">
        <Select
          defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={handleShowStatus}
          placeholder="Status"
        >
          <Option value="All">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Hold">Hold</Option>
        </Select>
      </div> */}
    </Flex>
  )

  return (
    <>
      {registrationsList ? (
        <Table
          className="table-responsive"
          columns={tableColumns}
          dataSource={registrationsList}
          rowKey="id"
        />
      ) : (
        ''
      )}

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
              <Input />
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
            <Form.Item
              name="status"
              label="Status"
              rules={rules.status}
              placeholder="Status"
            >
              <Select>
                <Option value="Verified">Verified</Option>
                <Option value="Evaluating">Evaluating</Option>
              </Select>
            </Form.Item>
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
          </Card>
        </Col>
      </Row>

      {registrations?.length > 0 ? (
        <Table
          className="table-responsive"
          columns={tableColumns}
          dataSource={registrations}
          rowKey="id"
        />
      ) : (
        ''
      )}

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
            <Form.Item
              name="status"
              label="Status"
              rules={rules.status}
              placeholder="Status"
            >
              <Select>
                <Option value="Verified">Verified</Option>
                <Option value="Evaluating">Evaluating</Option>
              </Select>
            </Form.Item>
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
              name="feeTypeId"
              label="Fee Type"
              rules={rules.feeTypeId}
              placeholder="Fee Type"
            >
              <Select>
                {feeTypes.map((feeType) => (
                  <Option value={feeType._id}>{feeType.name}</Option>
                ))}
              </Select>
            </Form.Item>
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
            <Form.Item
              name="receipt"
              label="Reciept"
              rules={rules.state}
              placeholder="Receipt image URL"
            >
              <Input />
            </Form.Item>
          </Card>
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
      {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
    </>
  )
}

export default RegistrationField
