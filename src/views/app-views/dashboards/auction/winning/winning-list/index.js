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
import useQueryFilters from 'hooks/useQueryFilters';
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

const pageSize = 8;

const WinningList = (props) => {
  const [winningList, setWinningList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [auctionInventories, setAuctionInventories] = useState([]);
  const [form] = Form.useForm();

  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  const params = new URLSearchParams(props.location.search);
  const inventoryId = params.get('inventoryId');

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

  const getAuctionInventories = async () => {
    const data = await auctionInventoryService.getInventories();
    if (data) {
      setAuctionInventories(data);
    }
  };

  const getWinnings = async () => {
    setIsLoading(true);
    const data = await winningService.getWinnings(
      new URLSearchParams(searchParams)
    );
    if (data) {
      const mutatedData = [];

      data.forEach((win) => {
        mutatedData.push({
          _id: win?._id,
          auctionInventoryId: win.auctionInventory?._id,
          auctionName: win.auction?.name,
          sellerEmail: win.seller?.email,
          winnerEmail: win.winner?.email,
          winningBid: win.winningBid?.amount
        });
      });

      setWinningList(mutatedData);
      setSearchBackupList(mutatedData);
    }
    if (inventoryId) {
      form.setFieldsValue({
        auctionInventory: inventoryId
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getWinnings();
  }, [searchParams]);

  useEffect(() => {
    getAuctionInventories();
  }, []);

  const addLottery = () => {
    history.push(`/app/dashboards/auction/winning/add-winning`);
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
    const searchArray = e.currentTarget.value ? winningList : searchBackupList;
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

  const handleSelectInventory = (value) => {
    handleFilters('auctionInventoryId', value);
  };

  // Table Filters JSX Elements
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
        <div>
          {addPrivilege && (
            <Button
              onClick={addLottery}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Winning
            </Button>
          )}
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={winningList}
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

export default WinningList;
