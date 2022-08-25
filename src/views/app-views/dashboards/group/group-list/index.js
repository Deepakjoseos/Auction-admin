import React, { useEffect, useState } from 'react'
import { Card, Table, Select, Input, Button, Menu, Tag } from 'antd'
// import InformationListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'

import feeTypeService from 'services/FeeType'
import { useSelector } from 'react-redux'

const { Option } = Select

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
  return null
}
const GroupList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({})

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      const feeTypeRole = user.roles.find((role) => role.module === 'FEE_TYPE')
      console.log('feeTypeRole', feeTypeRole)
      setCurrentSubAdminRole(feeTypeRole)
    }
  }, [user])
  console.log(user, 'jhbjkbuser')

  useEffect(() => {
    const getFeeTypes = async () => {
      const data = await feeTypeService.getFeeTypes()
      if (data) {
        setList(data)
        setSearchBackupList(data)
        console.log(data, 'show-data')
      }
    }
    getFeeTypes()
  }, [])

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
      if (currentSubAdminRole?.edit) {
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
  }

  const addGroup = () => {
    history.push(`/app/dashboards/group/add-group`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/group/edit-group/${row._id}`)
  }

  //   const deleteRow = async (row) => {
  //     const resp = await informationService.deleteInformation(row.id)

  //     if (resp) {
  //       const objKey = 'id'
  //       let data = list
  //       if (selectedRows.length > 1) {
  //         selectedRows.forEach((elm) => {
  //           data = utils.deleteArrayRow(data, objKey, elm.id)
  //           setList(data)
  //           setSelectedRows([])
  //         })
  //       } else {
  //         data = utils.deleteArrayRow(data, objKey, row.id)
  //         setList(data)
  //       }
  //     }
  //   }

  const tableColumns = [
    // {
    //   title: 'Information',
    //   dataIndex: 'name',
    //   render: (_, record) => (
    //     <div className="d-flex">
    //       <AvatarStatus
    //         size={60}
    //         type="square"
    //         src={record.image}
    //         name={record.name}
    //       />
    //     </div>
    //   ),
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'Order',
      dataIndex: 'order',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'order'),
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
          {window.localStorage.getItem('auth_type') === 'Admin' ? (
            <EllipsisDropdown menu={dropdownMenu(elm)} />
          ) : (
            currentSubAdminRole?.edit && (
              <EllipsisDropdown menu={dropdownMenu(elm)} />
            )
          )}
        </div>
      ),
    },
  ]

  const onSearch = (e) => {
    const value = e.currentTarget.value
    const searchArray = e.currentTarget.value ? list : searchBackupList
    const data = utils.wildCardSearch(searchArray, value)
    setList(data)
    setSelectedRowKeys([])
  }

  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status'
      const data = utils.filterArray(searchBackupList, key, value)
      setList(data)
    } else {
      setList(searchBackupList)
    }
  }

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
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
        <div>
          {window.localStorage.getItem('auth_type') === 'SubAdmin' ? (
            <>
              {currentSubAdminRole?.add && (
                <Button
                  onClick={addGroup}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add Group
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={addGroup}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Group
            </Button>
          )}
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  )
}

export default GroupList
