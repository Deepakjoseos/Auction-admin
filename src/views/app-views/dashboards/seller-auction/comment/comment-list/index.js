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
  notification
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

import commentService from 'services/comment';
import auctionInventoryService from 'services/auctionInventory';

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

  return null;
};

const CommentList = (props) => {
  const params = new URLSearchParams(props.location.search);
  const inventoryId = params.get('inventoryId');

  const [auctionInventories, setAuctionInventories] = useState([]);

  const [commentList, setCommentList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedInventoryId, setSelectedInventoryId] = useState('All');

  const history = useHistory();

  const getAuctionInventories = async () => {
    const data = await auctionInventoryService.getSellerInventories();
    if (data) {
      setAuctionInventories(data);
    }
  };

  const getCommentList = async (inventoryId = null) => {
    const data = await commentService.getSellerComments(
      inventoryId ? `?auctionInventoryId=${inventoryId}` : ''
    );
    if (data) {
      const mutatedComments = [];

      data.forEach((comment) => {
        mutatedComments.push({
          _id: comment._id,
          auctionInventoryId: comment.auctionInventory._id,
          message: comment.message,
          userEmail: comment.user.email,
          timestamp: comment.timestamp
        });
      });

      setCommentList(mutatedComments);
      setSearchBackupList(mutatedComments);
      setSelectedInventoryId(inventoryId ? inventoryId : 'All');
      return;
    }
    setSelectedInventoryId('All');
  };

  useEffect(() => {
    getCommentList(inventoryId);
    getAuctionInventories();
  }, []);

  // useEffect(() => {
  //   if (auctionInventories.length > 0) {
  //     getCommentList(inventoryId);
  //   }
  // }, [auctionInventories]);

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'auctionInventoryId',
      dataIndex: 'auctionInventoryId',
      render: (auctionInventoryId) => {
        return <Flex alignItems="center">{auctionInventoryId}</Flex>;
      }
    },
    {
      title: 'Message',
      dataIndex: 'message',
      render: (message) => {
        return <Flex alignItems="center">{message}</Flex>;
      },
      sorter: (a, b) => a.message.localeCompare(b?.message)
    },
    {
      title: 'User Email',
      dataIndex: 'userEmail',
      render: (userEmail) => {
        return <Flex alignItems="center">{userEmail}</Flex>;
      },
      sorter: (a, b) => a.userEmail.localeCompare(b?.userEmail)
    },
    {
      title: 'Date',
      dataIndex: 'timestamp',
      render: (timestamp) => {
        return (
          <Flex alignItems="center">{new Date(timestamp).toUTCString()}</Flex>
        );
      },
      sorter: (a, b) => a.timestamp > b.timestamp
    }

    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   render: (status) => (
    //     <Flex alignItems="center">{getStockStatus(status)}</Flex>
    //   ),
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
    // },
  ];

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? commentList : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setCommentList(data);
  };

  // Filter Status Handler
  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status';
      const data = utils.filterArray(searchBackupList, key, value);
      setCommentList(data);
    } else {
      setCommentList(searchBackupList);
    }
  };

  // Filter Status Handler
  const handleSelectInventory = (value) => {
    if (value !== 'All') {
      getCommentList(value);
    } else {
      getCommentList();
    }
  };

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

      <div className="mb-3 ml-3">
        <Select
          defaultValue={'All'}
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={handleSelectInventory}
          placeholder="Auction Inventories"
          showSearch
          value={selectedInventoryId}
        >
          <Option value="All">All</Option>
          {auctionInventories?.map((inventory) => (
            <Option
              key={inventory._id}
              value={inventory._id}
              disabled={inventory.status === 'Hold'}
            >
              {`${inventory.registrationNumber} (${inventory.auction.name})`}
            </Option>
          ))}
        </Select>
      </div>
    </Flex>
  );

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={commentList} rowKey="id" />
      </div>
    </Card>
  );
};

export default CommentList;
