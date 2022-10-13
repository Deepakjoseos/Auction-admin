import React, { useEffect, useState } from 'react'
import { Card, Table, Select, Input, Button, Menu, Tag } from 'antd'
// import TemplateListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import watchlistService from 'services/watchlist'
import constantsService from 'services/constants'

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
const WatchlistList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [statuses, setStatuses] = useState([])
  // const fetchConstants = async () => {
  //   const data = await constantsService.getConstants()
  //   if (data) {
  //     // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

  //     setStatuses(Object.values(data.GENERAL['STATUS']))

  //   }
  // }
  const getWatchlist = async () => {
    const data = await watchlistService.getWatchlist()
    if (data) {
      setList(data)
      setSearchBackupList(data)
      console.log(data, 'show-data')
    }
  }
  useEffect(() => {

    getWatchlist()
    // fetchConstants()
  }, [])

  const dropdownMenu = (row) => (
    <Menu>
      {/* <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item> */}
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

  const addWatchlist = () => {
    history.push(`/app/dashboards/watchlist/add-watchlist`)
  }

  // const viewDetails = (row) => {
  //   history.push(`/app/dashboards/watchlist/edit-watchlist/${row._id}`)
  // }

  const deleteRow = async (row) => {
    const resp = await watchlistService.deletewatchlist(row._id)
    if (resp) {
      getWatchlist()
    }
    // if (resp) {
    //   const objKey = 'id'
    //   let data = list
    //   if (selectedRows.length > 1) {
    //     selectedRows.forEach((elm) => {
    //       data = utils.deleteArrayRow(data, objKey, elm.id)
    //       setList(data)
    //       setSelectedRows([])
    //     })
    //   } else {
    //     data = utils.deleteArrayRow(data, objKey, row.id)
    //     setList(data)
    //   }
    // }

  }

  const tableColumns = [
    {
      title: " Name",
      dataIndex: "auction",
      render: (auction) => <Flex alignItems="center">{auction.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: " color",
      dataIndex: "inventories",
      render: (inventories) => <Flex justifyContent="center" flexDirection='column'>
        {
          inventories?.map(inv => inv?.vehicleInfo?.color)
        }
      </Flex>,
      // <Flex alignItems="center">{vehicleInfo?.color}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },

    {
      title: " Make",
      dataIndex: "inventories",
      render: (inventories) => <Flex justifyContent="center" flexDirection='column'>
        {
          inventories?.map(inv => inv?.vehicleInfo?.make)
        }
      </Flex>,
      // <Flex alignItems="center">{vehicleInfo?.color}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: " Model",
      dataIndex: "inventories",
      render: (inventories) => <Flex justifyContent="center" flexDirection='column'>
        {
          inventories?.map(inv => inv?.vehicleInfo?.model)
        }
      </Flex>,
      // <Flex alignItems="center">{vehicleInfo?.color}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: " MfgYear",
      dataIndex: "inventories",
      render: (inventories) => <Flex justifyContent="center" flexDirection='column'>
        {
          inventories?.map(inv => inv?.vehicleInfo?.mfgYear)
        }
      </Flex>,
      // <Flex alignItems="center">{vehicleInfo?.color}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
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
          className="w-100"
          style={{ minWidth: 180 }}
          placeholder="Status"
        >
          <Option value="">All</Option>
          {/* {statuses.map((item) => (
                <Option key={item.id} value={item}>
                  {item}
                </Option>
              ))} */}
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
          <Button
            onClick={addWatchlist}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Watchlist
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  )
}

export default WatchlistList
