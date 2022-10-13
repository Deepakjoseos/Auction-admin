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
  DatePicker,
  Table,
  Menu,
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
  countedIn: [
    {
      required: true,
      message: 'Required',
    },
  ],
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
const getStockStatus = (status) => {
  if (status === 'Active') {
    return (
      <>
        <Tag color="green">Active</Tag>
      </>
    )
  }
  if (status === 'Hold') {
    return (
      <>
        <Tag color="red">Hold</Tag>
      </>
    )
  }

  if (status === 'Deleted') {
    return (
      <>
        <Tag color="red">Deleted</Tag>
      </>
    )
  }
  return null
}

const RegistrationField = ({ feeTypes, currentParticipant, registrations }) => {
  console.log('participantid', currentParticipant)
  // const initialValues = {
  //     participantId: currentParticipant._id,

  //   };
  const [registrationsList, setRegistrationsList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  if (registrations) {
    setRegistrationsList(registrations)
    setSearchBackupList(registrations)
  }

  const dropdownMenu = (row) => {
    if (window.localStorage.getItem('auth_type') === 'Admin') {
      return (
        <Menu>
          <Menu.Item onClick={() => viewDetails(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">View Details</span>
            </Flex>
          </Menu.Item>
        </Menu>
      )
    } else {
      return (
        <Menu>
          <Menu.Item onClick={() => viewDetails(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">View Details</span>
            </Flex>
          </Menu.Item>
        </Menu>
      )
    }
  }

  // const addBanner = () => {
  //   history.push(`/app/dashboards/banner/add-banner`)
  // }

  const viewDetails = (row) => {
    console.log('row', row)
    //  history.push(`/app/dashboards/banner/edit-banner/${row._id}`)
  }

  // For deleting a row

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
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
  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status'
      const data = utils.filterArray(searchBackupList, key, value)
      setRegistrationsList(data)
    } else {
      setRegistrationsList(searchBackupList)
    }
  }

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
      <div className="mb-3">
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
      </div>
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
            <Form.Item
              name="participantId"
              label="Participant"
              rules={rules.participantId}
              value={currentParticipant?._id}
              placeholder="CurrentParticipant"
            >
              <Input />
            </Form.Item>
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
          {/* </Form>  */}
        </Col>
      </Row>
    </>
  )
}

export default RegistrationField
