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

  return null;
};

const pageSize = 8;

const CommentList = (props) => {
  const params = new URLSearchParams(props.location.search);
  const inventoryId = params.get('inventoryId');

  const [auctionInventories, setAuctionInventories] = useState([]);

  const [commentList, setCommentList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);

  const [form] = Form.useForm();

  const {
    handleFilters,
    isLoading,
    onChangeCurrentPageNumber,
    setIsLoading,
    searchParams
  } = useQueryFilters(
    inventoryId
      ? {
          limit: pageSize,
          page: 1,
          auctionInventoryId: inventoryId
        }
      : {
          limit: pageSize,
          page: 1
        }
  );

  const history = useHistory();

  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  const getAuctionInventories = async () => {
    const data = await auctionInventoryService.getInventories();
    if (data) {
      setAuctionInventories(data.inventories);
    }
  };

  const getCommentList = async () => {
    setIsLoading(true);
    const data = await commentService.getComments(
      new URLSearchParams(searchParams)
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
    }
    if (inventoryId) {
      form.setFieldsValue({
        auctionInventory: inventoryId
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getAuctionInventories();
  }, []);

  useEffect(() => {
    getCommentList();
  }, [searchParams]);

  const deleteRow = async (row) => {
    console.log(row._id);
    const resp = await commentService.deleteComment(row._id);
    if (resp) {
      //TODO: fetch all comments
      getCommentList();
    }
  };
  const dropdownMenu = (row) => {
    if (deletePrivilege) {
      return (
        <Menu>
          <Menu.Item onClick={() => deleteRow(row)}>
            <Flex alignItems="center">
              <DeleteOutlined />
              <span className="ml-2">Delete</span>
            </Flex>
          </Menu.Item>
        </Menu>
      );
    }
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Auction Inventory',
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
    },

    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   render: (status) => (
    //     <Flex alignItems="center">{getStockStatus(status)}</Flex>
    //   ),
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
    // },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          {deletePrivilege && <EllipsisDropdown menu={dropdownMenu(elm)} />}
        </div>
      )
    }
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
    handleFilters('auctionInventoryId', value);
  };

  const filters = () => (
    <Form
      layout="vertical"
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
    >
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
          <Form.Item name="auctionInventory">
            <Select
              defaultValue={'All'}
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={handleSelectInventory}
              placeholder="Auction Inventories"
              showSearch
              disabled={inventoryId}
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
          </Form.Item>
        </div>
      </Flex>
    </Form>
  );

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={commentList}
          rowKey="id"
          pagination={{
            total: 24, // TODO: get the total count from API
            defaultCurrent: 1,
            defaultPageSize: pageSize,
            onChange: onChangeCurrentPageNumber
          }}
          loading={isLoading}
        />
      </div>
    </Card>
  );
};

export default CommentList;
