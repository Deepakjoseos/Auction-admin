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

import winningService from 'services/winning';

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

  return null;
};

const WinningList = () => {
  const [winningList, setWinningList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);

  const history = useHistory();

  const getWinnings = async () => {
    const data = await winningService.getWinnings();
    if (data) {
      const mutatedData = [];

      data.forEach((win) => {
        mutatedData.push({
          _id: win._id,
          auctionInventoryId: win.auctionInventory._id,
          auctionName: win.auction.name,
          sellerEmail: win.seller.email,
          winnerEmail: win.winner.email,
          winningBid: win.winningBid.amount
        });
      });

      setWinningList(mutatedData);
      setSearchBackupList(mutatedData);
    }
  };

  useEffect(() => {
    getWinnings();
  }, []);

  const addLottery = () => {
    history.push(`/app/dashboards/winning/add-winning`);
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Win id',
      dataIndex: '_id',
      render: (id) => {
        return <Flex alignItems="center">{id}</Flex>;
      },
      sorter: (a, b) => a._id.localeCompare(b?._id)
    },
    {
      title: 'Auction Inventory ID',
      dataIndex: 'auctionInventoryId',
      render: (auctionInventoryId) => {
        return <Flex alignItems="center">{auctionInventoryId}</Flex>;
      },
      sorter: (a, b) =>
        a.auctionInventoryId.localeCompare(b?.auctionInventoryId)
    },
    {
      title: 'Auction Name',
      dataIndex: 'auctionName',
      render: (auctionName) => {
        return <Flex alignItems="center">{auctionName}</Flex>;
      },
      sorter: (a, b) => a.auctionName.localeCompare(b?.auctionName)
    },
    {
      title: 'Seller Email',
      dataIndex: 'sellerEmail',
      render: (sellerEmail) => {
        return <Flex alignItems="center">{sellerEmail}</Flex>;
      },
      sorter: (a, b) => a.sellerEmail.localeCompare(b?.sellerEmail)
    },
    {
      title: 'Winner Email',
      dataIndex: 'winnerEmail',
      render: (winnerEmail) => {
        return <Flex alignItems="center">{winnerEmail}</Flex>;
      },
      sorter: (a, b) => a.winnerEmail.localeCompare(b?.winnerEmail)
    },
    {
      title: 'Winning Bid',
      dataIndex: 'winningBid',
      render: (winningBid) => {
        return <Flex alignItems="center">{winningBid}</Flex>;
      },
      sorter: (a, b) => a.winningBid > b.winningBid
    }
  ];
  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value
      ? winningList
      : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setWinningList(data);
  };

  // Filter Status Handler
  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status';
      const data = utils.filterArray(searchBackupList, key, value);
      setWinningList(data);
    } else {
      setWinningList(searchBackupList);
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
        <div>
          <Button
            onClick={addLottery}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Winning
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={winningList} rowKey="id" />
      </div>
    </Card>
  );
};

export default WinningList;
