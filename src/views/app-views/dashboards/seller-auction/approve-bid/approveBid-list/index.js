import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  Modal,
  Form,
  notification,
  message
} from 'antd';

import {
  EyeOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';

import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';

import utils from 'utils';
import approveBidService from 'services/approveBid';

const ApproveBidList = (props) => {
  const [approveBidList, setApproveBidList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);


  const params = new URLSearchParams(props.location.search);
  const inventoryId = params.get('inventoryId');

  const history = useHistory();

  const getApproveBidList = async () => {
    const data = await approveBidService.getSellerApproveBids(
      inventoryId ? `auctionInventoryId=${inventoryId}` : ''
    );
    if (data) {
      //   const mutatedData = [];

      //   data.forEach((win) => {
      //     mutatedData.push({
      //       _id: win._id,
      //       auctionInventoryId: win.auctionInventory._id,
      //       auctionName: win.auction.name,
      //       sellerEmail: win.seller.email,
      //       winnerEmail: win.winner.email,
      //       winningBid: win.winningBid.amount
      //     });
      //   });

      setApproveBidList(data);
      setSearchBackupList(data);
    }
  };

  useEffect(() => {
    getApproveBidList();
  }, []);

  
  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Auction Name',
      dataIndex: 'auction',
      render: (auction) => {
        return <Flex alignItems="center">{auction.name}</Flex>;
      },
      sorter: (a, b) => a.auction.name.localeCompare(b?.auction.name)
    },
    {
      title: 'Seller',
      dataIndex: 'seller',
      render: (seller) => {
        return <Flex alignItems="center">{seller.name}</Flex>;
      },
      sorter: (a, b) => a.seller.name.localeCompare(b?.seller.name)
    },
    {
      title: 'Bidder',
      dataIndex: 'bidder',
      render: (bidder) => {
        return <Flex alignItems="center">{bidder.name}</Flex>;
      },
      sorter: (a, b) => a.bidder.name.localeCompare(b?.bidder.name)
    },
    {
      title: 'Bidding amount',
      dataIndex: 'bidding',
      render: (bidding) => {
        return <Flex alignItems="center">{bidding.amount}</Flex>;
      },
      sorter: (a, b) => a.bidding.amount > b.bidding.amount
    },
    {
      title: 'Approve amount',
      dataIndex: 'finalAmount',
      render: (finalAmount) => {
        return <Flex alignItems="center">{finalAmount}</Flex>;
      },
      sorter: (a, b) => a.finalAmount > b.finalAmount
    },
    ,
    {
      title: 'Approval status',
      dataIndex: 'approvalStatus',
      render: (approvalStatus) => {
        return <Flex alignItems="center">{approvalStatus}</Flex>;
      },
      sorter: (a, b) => a.approvalStatus.localeCompare(b?.approvalStatus)
    }
  ];
  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value
      ? approveBidList
      : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setApproveBidList(data);
  };

  // Filter Status Handler
  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status';
      const data = utils.filterArray(searchBackupList, key, value);
      setApproveBidList(data);
    } else {
      setApproveBidList(searchBackupList);
    }
  };

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
  );
  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={approveBidList} rowKey="id" />
      </div>
    </Card>
  );
};

export default ApproveBidList;
