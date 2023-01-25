import React, { useEffect, useState } from 'react';
import { Card, Table, Row, Col, Select, Input, Button, Menu, Tag, message ,Form } from 'antd';
// import BrandListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import qs from 'qs'
import _, { get } from 'lodash'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import utils from 'utils';
import bannerService from 'services/banner';
import { useSelector } from 'react-redux';
import biddingService from 'services/Bidding';
import moment from 'moment';
import auctionService from 'services/auction';
import auctionInventoryService from 'services/auctionInventory';
import participantService from 'services/Participant';
import winningService from 'services/winning';
import useUserPrivilege from 'hooks/useUserPrivilege';
import approveBidService from 'services/approveBid';
import useQueryFilters from 'hooks/useQueryFilters';

const { Option } = Select;

const getStockStatus = (status) => {
  if (status === 'Active') {
    return (
      <>
        <Tag color="green">Active</Tag>
      </>
    );
  }
  if (status === 'Hold') {
    return (
      <>
        <Tag color="red">Hold</Tag>
      </>
    );
  }

  if (status === 'Deleted') {
    return (
      <>
        <Tag color="red">Deleted</Tag>
      </>
    );
  }
  return null;
};

const pageSize = 8;

const BiddingList = (props) => {
  let history = useHistory();

  const params = new URLSearchParams(props.location.search);
  const inventoryId = params.get('inventoryId');

  const winningPrivileges = useUserPrivilege('WINNING');
  const approveBiddingPrivileges = useUserPrivilege('BIDDING');

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  const [auctions, setAuctions] = useState([]);
  const [auctionInventories, setAuctionInventories] = useState([]);
  const [bidders, setBidders] = useState([]);
  const [selectedAuctionId, setSelectedAuctionId] = useState('');
  const [selectedAuctionInventory, setSelectedAuctionInventory] = useState('');
  const [selectedBidder, setSelectedBidder] = useState('');
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)
   // pagination
   const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  })
  // const {
  //   handleFilters,
  //   isLoading,
  //   onChangeCurrentPageNumber,
  //   setIsLoading,
  //   searchParams
  // } = useQueryFilters(
  //   inventoryId
  //     ? {
  //         limit: pageSize,
  //         page: 1,
  //         auctionInventoryId: inventoryId
  //       }
  //     : {
  //         limit: pageSize,
  //         page: 1
  //       }
  // );

  const getBiddings = async (paginationParams = {}, filterParams) => {
    setIsLoading(true);
    const data = await biddingService.getBiddings(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
      );
    if (data) {
      setList(data.data);
      setSearchBackupList(data);
      // Pagination
    setPagination({
      ...paginationParams.pagination,
      total: data.count,
    })
      console.log(data, 'show-data bidding');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    
    getBiddings({
      pagination,
    });
  }, []);

  useEffect(() => {
    // Getting Lotteries List to display in the table
    const getAuctions = async () => {
      const data = await auctionService.getauctions();
      if (data) {
        setAuctions(data.data);
        // setSearchBackupList(data)
        console.log(data, 'show-auctions');
      }
    };
    getAuctions();
    const getAuctionInventories = async () => {
      const data = await auctionInventoryService.getInventories();
      if (data) {
        setAuctionInventories(data.inventories);
        // setSearchBackupList(data)
        console.log(data, 'show-auction_inventories');
      }
    };
    getAuctionInventories();
    getAuctions();
    const getParticipants = async () => {
      const data = await participantService.getAllParticipants();
      if (data) {
        setBidders(data);
        // setSearchBackupList(data)
        console.log(data, 'show-auction_inventories');
      }
    };
    getParticipants();
  }, []);

  const { user } = useSelector((state) => state.auth);

 // pagination generator
 const getPaginationParams = (params) => ({
  limit: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
})


  // On pagination Change
  const handleTableChange = (newPagination) => {
    getBiddings(
      { 
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }

  const resetPagination = () => ({
    ...pagination,
    current: 1,
    pageSize: 5,
  })



// Filter Submit
const handleFilterSubmit = async () => {
setPagination(resetPagination())

form
  .validateFields()
  .then(async (values) => {
    setFilterEnabled(true)
    // Removing falsy Values from values
    const sendingValues = _.pickBy(values, _.identity)
    getBiddings({ pagination: resetPagination() }, sendingValues)
  })
  .catch((info) => {
    console.log('info', info)
    setFilterEnabled(false)
  })
}

const handleClearFilter = async () => {
form.resetFields()

setPagination(resetPagination())
getBiddings({ pagination: resetPagination() }, {})
setFilterEnabled(false)
} 
  //   useEffect(() => {
  //     if (user) {
  //       const bannerRole = user.roles.find((role) => role.module === 'BANNER')
  //       console.log('bannerRole', bannerRole)
  //       setCurrentSubAdminRole(bannerRole)
  //     }
  //   }, [user])

  // Dropdown menu for each row
  const dropdownMenu = (row) => {
    return (
      <Menu>
        {/* <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Details</span>
          </Flex>
        </Menu.Item> */}
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
        <Menu.Item onClick={() => viewWinnings(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Winnings</span>
          </Flex>
        </Menu.Item>
        {winningPrivileges.addPrivilege && (
          <Menu.Item onClick={() => addToWinnings(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">Add to Winnings</span>
            </Flex>
          </Menu.Item>
        )}
        {/* {approveBiddingPrivileges.addPrivilege && (
          <Menu.Item onClick={() => approveBid(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">Approve Bid</span>
            </Flex>
          </Menu.Item>
        )} */}
      </Menu>
    );
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/auction/bidding/biddingview/${row._id}`);
  };

  const viewWinnings = (row) => {
    history.push(
      `/app/dashboards/auction/winning/winning-list?inventoryId=${row.auctionInventory._id}`
    );
  };

  const addToWinnings = async (row) => {
    const added = await winningService.addWinning({
      auctionInventoryId: row.auctionInventory._id,
      winnerId: row.bidder._id
    });
    if (added) {
      message.success(`Added ${row.auctionInventory._id} to Winnings`);
    }
  };

  const approveBid = async (row) => {
    const added = await approveBidService.addApproveBid({
      bidId: row._id,
      finalAmount: 0
    });

    if (added) {
      message.success(`Approved ${row._id} Bid`);
    }
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Auction Name',
      dataIndex: 'auction',
      render: (auction) => <Flex alignItems="center">{auction?.name}</Flex>
      //   sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },

    {
      title: 'Type',
      dataIndex: 'auction',
      render: (auction) => (
        <Flex alignItems="center">{auction?.businessType}({auction?.type})</Flex>
      )
      //   sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },

    // {
    //   title: 'Type',
    //   dataIndex: 'auction',
    //   render: (auction) => <Flex alignItems="center">{auction?.type}</Flex>
    //   //   sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    // },

    {
      title: 'Bidder Name',
      dataIndex: 'bidder',
      render: (bidder) => <Flex alignItems="center">{bidder?.name}</Flex>
      //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },

    {
      title: 'Created By',
      dataIndex: 'bidder',
      render: (bidder) => (
        <Flex alignItems="center">
          {bidder?.auth} &nbsp;({bidder?.participantType})
        </Flex>
      )
      //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },

    {
      title: 'Make-model',
      dataIndex: 'auctionInventory',
      render: (auctionInventory) => (
        <Flex alignItems="center">
          {auctionInventory?.vehicleInfo?.make}(
          {auctionInventory?.vehicleInfo?.model})
        </Flex>
      )
    },

    {
      title: 'Start Time',
      dataIndex: 'auction',
      render: (auction) => {
        // var d = new Date(Number(auction?.startTimestamp)).toDateString();
        var options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        var d = new Date(Number(auction?.startTimestamp)).toLocaleString('en-IN', options);
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'business')
    },
    {
      title: 'End Time',
      dataIndex: 'auction',
      render: (auction) => {
        var options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        var d = new Date(Number(auction?.endTimestamp)).toLocaleString('en-IN', options);
        // var d = new Date(Number(auction?.endTimestamp)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'business')
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (amount) => <Flex alignItems="center">{amount}/-</Flex>
    },

    {
      title: 'Status',
      dataIndex: 'auction',
      render: (auction) => (
        <Flex alignItems="center">{getStockStatus(auction?.status)}</Flex>
      )
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
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      )
    }
  ];

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  // Filter Status Handler
  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status';
      const data = utils.filterArray(searchBackupList, key, value);
      setList(data);
    } else {
      setList(searchBackupList);
    }
  };
  const handleQuery = async () => {
    const query = {};
    //  if(selectedLotteryNumber) query.lotteryNumber=selectedLotteryNumber;
    if (selectedAuctionId) query.auctionId = selectedAuctionId;
    if (selectedAuctionInventory)
      query.auctionInventoryId = selectedAuctionInventory;
    if (selectedBidder) query.bidderId = selectedBidder;
    const data = await biddingService.getBiddings(query);
    if (data) {
      setList(data);
      setSearchBackupList(data);
    }
  };

  // const handleClearFilter = async () => {
  //   setSelectedAuctionId(null);
  //   setSelectedAuctionInventory(null);
  //   selectedBidder(null);

  //   const data = await biddingService.getBiddings({});
  //   if (data) {
  //     setList(data);
  //     setSearchBackupList(data);
  //   }
  // };
  // Table Filters JSX Elements
  const filters = () => (
    <Form
    layout="vertical"
    form={form}
    name="filter_form"
    className="ant-advanced-search-form"
  >
    <Row gutter={8} align="bottom">
     <Col md={6} sm={24} xs={24} lg={6}>
        <Form.Item name="auctionId" label="Auction">
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }

          // onChange={(value) => setSelectedAuctionId(value)}
          // value={selectedAuctionId}
          // onSelect={handleQuery}
          placeholder="Select Auction"
        >
          {auctions.map((item) => (
            <Option 
            key={item._id} 
            value={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>
        </Form.Item>
      </Col>
      <Col md={6} sm={24} xs={24} lg={6}>
        <Form.Item name="bidderId" label="Bidders">
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }

          // onChange={(value) => setSelectedBidder(value)}
          // value={selectedBidder}
          // onSelect={handleQuery}
          placeholder="Select Auction Inventory"
        >
          {bidders.map((item) => (
            <Option 
            key={item._id} 
            value={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>
        </Form.Item>

      </Col>
      <Col md={6} sm={24} xs={24} lg={6}>
        {/* <label>Auction Inventory</label> */}
        <Form.Item name="auctionInventoryId" label="Auction Inventory">
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }

          // onChange={(value) => setSelectedAuctionInventory(value)}
          // value={selectedAuctionInventory}
          // onSelect={handleQuery}
          placeholder="Select Auction Inventory"
        >
          {auctionInventories.map((item) => (
            <Option 
            key={item._id}
             value={item._id}>
              {item.registrationNumber}
            </Option>
          ))}
        </Select>
        </Form.Item>
      </Col>
      <Col className="mb-4">
        <Button type="primary"  onClick={handleFilterSubmit}>
          Filter
        </Button>
      </Col>
      <Col className="mb-4">
        <Button type="primary" onClick={handleClearFilter}>
          Clear
        </Button>
        </Col> 
      </Row>
      </Form>
  );

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
        <Table
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
          // pagination={{
          //   total: 24, // TODO: get the total count from API
          //   defaultCurrent: 1,
          //   defaultPageSize: pageSize,
          //   onChange: onChangeCurrentPageNumber
          // }}
          // loading={isLoading}
          scroll={{
            x: true,
          }}
          onChange={handleTableChange}
          pagination={pagination}
          loading={isLoading}
        />
      </div>
    </Card>
  );
};

export default BiddingList;
