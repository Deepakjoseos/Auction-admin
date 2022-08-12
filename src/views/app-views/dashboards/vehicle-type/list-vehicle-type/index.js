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
import informationService from 'services/information'
import vehicletypeService from 'services/vehicleType'
import VehicleTypeForm from '../vehicle-type-form'
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
const VehicleTypeList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({})

  useEffect(() => {
    const getVehicleTypes = async () => {
      const data = await vehicletypeService.getVehicleTypes()
      if (data) {
        setList(data)
        setSearchBackupList(data)
        console.log(data, 'show-data')
      }
    }
    console.log('hi')
    getVehicleTypes()
  }, [])

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      const vehicleRole = user.roles.find(
        (role) => role.module === 'VEHICLE TYPE'
      )
      console.log('vehicleRole', vehicleRole)
      setCurrentSubAdminRole(vehicleRole)
    }
  }, [user])

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
          <Menu.Item onClick={() => deleteRow(row)}>
            <Flex alignItems="center">
              <DeleteOutlined />
              <span className="ml-2">
                {selectedRows.length > 0
                  ? `Delete (${selectedRows.length})`
                  : 'Delete'}
              </span>
            </Flex>
          </Menu.Item>
        </Menu>
      )
    } else {
      return (
        <Menu>
          {currentSubAdminRole?.edit && (
            <Menu.Item onClick={() => viewDetails(row)}>
              <Flex alignItems="center">
                <EyeOutlined />
                <span className="ml-2">View Details</span>
              </Flex>
            </Menu.Item>
          )}
          {currentSubAdminRole?.delete && (
            <Menu.Item onClick={() => deleteRow(row)}>
              <Flex alignItems="center">
                <DeleteOutlined />
                <span className="ml-2">
                  {selectedRows.length > 0
                    ? `Delete (${selectedRows.length})`
                    : 'Delete'}
                </span>
              </Flex>
            </Menu.Item>
          )}
        </Menu>
      )
    }
  }

  const addVehicleType = () => {
    history.push(`/app/dashboards/vehicle-type/add-vehicle-type`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/vehicle-type/edit-vehicle-type/${row.id}`)
  }

  const deleteRow = async (row) => {
    const resp = await vehicletypeService.deleteVehicleType(row.id)

    if (resp) {
      const objKey = 'id'
      let data = list
      if (selectedRows.length > 1) {
        selectedRows.forEach((elm) => {
          data = utils.deleteArrayRow(data, objKey, elm.id)
          setList(data)
          setSelectedRows([])
        })
      } else {
        data = utils.deleteArrayRow(data, objKey, row.id)
        setList(data)
      }
    }
  }

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
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
          {window.localStorage.getItem('auth_type') === 'Admin' ? (
            <EllipsisDropdown menu={dropdownMenu(elm)} />
          ) : (
            (currentSubAdminRole?.edit || currentSubAdminRole?.delete) && (
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
                  onClick={addVehicleType}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add Vehicle Type
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={addVehicleType}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Vehicle Type
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

export default VehicleTypeList
