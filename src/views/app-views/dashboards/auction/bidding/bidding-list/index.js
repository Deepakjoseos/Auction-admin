import React, { useEffect, useState } from 'react'
import { Card, Table, Select, Input, Button, Menu, Tag } from 'antd'
// import BrandListData from 'assets/data/product-list.data.json'
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
import bannerService from 'services/banner'
import { useSelector } from 'react-redux'
import biddingService from 'services/Bidding'
import moment from 'moment'
import auctionService from 'services/auction'
import auctionInventoryService from 'services/auctionInventory'
import participantService from 'services/Participant'



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

    if (status === 'Deleted') {
        return (
            <>
                <Tag color="red">Deleted</Tag>
            </>
        )
    }
    return null
}
const BiddingList = () => {
    let history = useHistory()

    const [list, setList] = useState([])
    const [searchBackupList, setSearchBackupList] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [currentSubAdminRole, setCurrentSubAdminRole] = useState({})
    const [auctions,setAuctions] = useState([])
    const[auctionInventories,setAuctionInventories] = useState([])
    const [bidders,setBidders] = useState([])
    const [selectedAuctionId,setSelectedAuctionId] = useState('')
    const [selectedAuctionInventory,setSelectedAuctionInventory] = useState('')
    const [selectedBidder,setSelectedBidder] = useState('')

    useEffect(() => {
        // Getting Lotteries List to display in the table
        const getBiddings = async () => {
            const data = await biddingService.getBiddings()
            if (data) {
                setList(data)
                setSearchBackupList(data)
                console.log(data, 'show-data')
            }
        }
        getBiddings()
        const getAuctions = async () => {
            const data = await auctionService.getauctions()
            if (data) {
                setAuctions(data)
                // setSearchBackupList(data)
                console.log(data, 'show-auctions')
            }
        }
        getAuctions()
        const getAuctionInventories = async () => {
            const data = await auctionInventoryService.getInventories()
            if (data) {
                setAuctionInventories(data)
                // setSearchBackupList(data)
                console.log(data, 'show-auction_inventories')
            }
        }
        getAuctionInventories()
        getAuctions()
        const getParticipants = async () => {
            const data = await participantService.getAllParticipants()
            if (data) {
                setBidders(data)
                // setSearchBackupList(data)
                console.log(data, 'show-auction_inventories')
            }
        }
        getParticipants()
    }, [])
    

    const { user } = useSelector((state) => state.auth)

    //   useEffect(() => {
    //     if (user) {
    //       const bannerRole = user.roles.find((role) => role.module === 'BANNER')
    //       console.log('bannerRole', bannerRole)
    //       setCurrentSubAdminRole(bannerRole)
    //     }
    //   }, [user])

    // Dropdown menu for each row
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
                    {/* <Menu.Item onClick={() => deleteRow(row)}>
            <Flex alignItems="center">
              <DeleteOutlined />
              <span className="ml-2">
                {selectedRows.length > 0
                  ? `Delete (${selectedRows.length})`
                  : 'Delete'}
              </span>
            </Flex>
          </Menu.Item> */}
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
                    {/* {currentSubAdminRole?.delete && (
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
          )} */}
                </Menu>
            )
        }
    }

    const viewDetails = (row) => {
      
        history.push(`/app/dashboards/auction/bidding/biddingview/${row._id}`)
    }



    // Antd Table Columns
    const tableColumns = [
        {
            title: 'Auction Name',
            dataIndex: 'auction',
            render: (auction) => (
                <Flex alignItems="center">{auction?.name}</Flex>
            ),
            //   sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
        },
       
        {
            title: 'Business Type',
            dataIndex: 'auction',
            render: (auction) => (
                <Flex alignItems="center">{auction?.businessType}</Flex>
            ),
            //   sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
        },
        
        {
            title: 'Type',
            dataIndex: 'auction',
            render: (auction) => (
                <Flex alignItems="center">{auction?.type}</Flex>
            ),
            //   sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
        },

       
        {
            title: 'Bidder Name',
            dataIndex: 'bidder',
            render: (bidder) => (
                <Flex alignItems="center">{bidder?.name}</Flex>
            ),
            //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
        },
       
        {
            title: 'Auth',
            dataIndex: 'bidder',
            render: (bidder) => (
                <Flex alignItems="center">{bidder?.auth} &nbsp;({bidder?.participantType})</Flex>
               
            ),
            //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
            
         
        },

        {
          title: 'Make-model',
          dataIndex:'auctionInventory',
          render: (auctionInventory) => (
              <Flex alignItems="center">{auctionInventory?.vehicleInfo?.make}
              ({auctionInventory?.vehicleInfo?.model})</Flex>
             
          ),

      },
      {
      title: "Start Time",
      dataIndex: "startTimestamp",
      render: (status) => {
        var d = new Date(Number(status)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },
    {
      title: "End Time",
      dataIndex: "endTimestamp",
      render: (status) => {
        var d = new Date(Number(status)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },
      {
        title: 'Amount',
        dataIndex:'amount',
        render: (amount) => (
            <Flex alignItems="center">{amount}/-</Flex>
           
        ),

    },
       
        {
            title: 'Status',
            dataIndex: 'auction',
            render: (auction) => (
                <Flex alignItems="center">{getStockStatus(auction?.status)}</Flex>
            ),
            //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
        },
        // {
        //     title: 'Created Date',
        //     dataIndex: 'auction',
        //     render: (auction) => (
        //       <Flex alignItems="center">{moment(auction?.createdAt).format('YYYY-MM-DD hh:mm:a')}</Flex>
        //     ),
        //   //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
        //   },
        // {
        //     title: '',
        //     dataIndex: 'actions',
        //     render: (_, elm) => (
        //         <div className="text-right">
        //             {window.localStorage.getItem('auth_type') === 'Admin' ? (
        //                 <EllipsisDropdown menu={dropdownMenu(elm)} />
        //             ) : (
        //                 (currentSubAdminRole?.edit || currentSubAdminRole?.delete) && (
        //                     <EllipsisDropdown menu={dropdownMenu(elm)} />
        //                 )
        //             )}
        //         </div>
        //     ),
        // },
    ]

    // When Search is used
    const onSearch = (e) => {
        const value = e.currentTarget.value
        const searchArray = e.currentTarget.value ? list : searchBackupList
        const data = utils.wildCardSearch(searchArray, value)
        setList(data)
        setSelectedRowKeys([])
    }

    // Filter Status Handler
    const handleShowStatus = (value) => {
        if (value !== 'All') {
            const key = 'status'
            const data = utils.filterArray(searchBackupList, key, value)
            setList(data)
        } else {
            setList(searchBackupList)
        }
    }
    const handleQuery = async () => {
        const query = {}
        //  if(selectedLotteryNumber) query.lotteryNumber=selectedLotteryNumber;
        if (selectedAuctionId) query.auctionId = selectedAuctionId
        if (selectedAuctionInventory) query.auctionInventoryId = selectedAuctionInventory
        if(selectedBidder) query.bidderId= selectedBidder
        const data = await biddingService.getBiddings(query)
        if (data) {
          setList(data)
          setSearchBackupList(data)
        }
      }
    
      const handleClearFilter = async () => {
        setSelectedAuctionId(null)
        setSelectedAuctionInventory(null)
        selectedBidder(null)
    
        const data = await biddingService.getBiddings({})
        if (data) {
          setList(data)
          setSearchBackupList(data)
        }
      }
    // Table Filters JSX Elements
    const filters = () => (
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3 mt-4">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
          {/* <div className="mr-md-3 mb-3">
            <Select
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value) => setselectedLotteryNumber(value)}
              onSelect={handleQuery}
              placeholder="Lottery Number"
            >
       
              {lotteries.map((lottery) => (
                <Option key={lottery.id} value={lottery.number}>
                  {lottery.number}
                </Option>
              ))}
            </Select>
          </div> */}
          <div className="mr-md-3 mb-3">
            <label>Auction</label>
            <Select
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value) => setSelectedAuctionId(value)}
              value={selectedAuctionId}
              // onSelect={handleQuery}
              placeholder="Select Auction"
            >
              {auctions.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mr-md-3 mb-3">
            <label>Bidders</label>
            <Select
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value) => setSelectedBidder(value)}
              value={selectedBidder}
              // onSelect={handleQuery}
              placeholder="Select Auction Inventory"
            >
              {bidders.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mr-md-3 mb-3">
            <label>Auction Inventory</label>
            <Select
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value) => setSelectedAuctionInventory(value)}
              value={selectedAuctionInventory}
              // onSelect={handleQuery}
              placeholder="Select Auction Inventory"
            >
              {auctionInventories.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Button type="primary" className="mr-2 mt-4" onClick={handleQuery}>
              Filter
            </Button>
          </div>
          <div>
            <Button type="primary" className='mt-4' onClick={handleClearFilter}>
              Clear
            </Button>
          </div>
        </Flex>
      )

    return (
        <Card>
            <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                {filters()}
                {/* <div>
          {window.localStorage.getItem('auth_type') === 'SubAdmin' ? (
            <>
              {currentSubAdminRole?.add && (
                <Button
                  onClick={addBanner}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add Banner
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={addBanner}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Banner
            </Button>
          )}
        </div> */}
            </Flex>
            <div className="table-responsive">
                <Table columns={tableColumns} dataSource={list} rowKey="id" />
            </div>
        </Card>
    )
}

export default BiddingList
