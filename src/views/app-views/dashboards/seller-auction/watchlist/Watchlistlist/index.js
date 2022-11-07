import React, { useEffect, useState } from 'react';
import { Card, Table, Select, Input, Button, Menu, Tag } from 'antd';
// import TemplateListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import utils from 'utils';
import watchlistService from 'services/watchlist';
import constantsService from 'services/constants';

const { Option } = Select;

const watchlistType1 = 'Auction';
const watchlistType2 = 'AuctionInventory';

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
const WatchlistList = () => {
  let history = useHistory();

  const [watchlist, setWatchlist] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);

  const getWatchlist = async (watchlistType) => {
    const data = await watchlistService.getWatchlist(`?type=${watchlistType}`);
    if (data) {
      setWatchlist(data);
      setSearchBackupList(data);
      console.log(data, 'show-data');
    }
  };
  useEffect(() => {
    getWatchlist(watchlistType1);
  }, []);

  const tableColumns = [
    {
      title: 'Auction Name',
      dataIndex: 'auction',
      render: (auction) => <Flex alignItems="center">{auction.name}</Flex>,
      sorter: (a, b) => a.auction.name.localeCompare(b.auction.name)
    },
    {
      title: 'Participant Name',
      dataIndex: 'participant',
      render: (participant) => (
        <Flex alignItems="center">{participant.name}</Flex>
      ),
      sorter: (a, b) => a.participant.name.localeCompare(b.participant.name)
    },
    {
      title: 'Participant Email',
      dataIndex: 'participant',
      render: (participant) => (
        <Flex alignItems="center">{participant.email}</Flex>
      ),
      sorter: (a, b) => a.participant.email.localeCompare(b.participant.email)
    },
    {
      title: 'Make',
      dataIndex: 'inventories',
      render: (inventories) =>
        inventories.map((inventory) => (
          <Tag color={'geekblue'} key={inventory._id}>
            {inventory.vehicleInfo.make.toUpperCase()}
          </Tag>
        )),
    },
    {
      title: 'Model',
      dataIndex: 'inventories',
      render: (inventories) =>
        inventories.map((inventory) => (
          <Tag color={'geekblue'} key={inventory._id}>
            {inventory.vehicleInfo.model.toUpperCase()}
          </Tag>
        )),
    },
    {
      title: 'mfgYear',
      dataIndex: 'inventories',
      render: (inventories) =>
        inventories.map((inventory) => (
          <Tag color={'geekblue'} key={inventory._id}>
            {inventory.vehicleInfo.mfgYear}
          </Tag>
        )),
    }

    // {
    //   title: '',
    //   dataIndex: 'actions',
    //   render: (_, elm) => (
    //     <div className="text-right">
    //       <EllipsisDropdown menu={dropdownMenu(elm)} />
    //     </div>
    //   )
    // }
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? watchlist : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setWatchlist(data);
  };

  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status';
      const data = utils.filterArray(searchBackupList, key, value);
      setWatchlist(data);
    } else {
      setWatchlist(searchBackupList);
    }
  };

  const handleWatchlistType = (value) => {
    getWatchlist(value);
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
          className="w-100"
          style={{ minWidth: 180 }}
          placeholder="Status"
        >
          <Option value="">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Hold">Hold</Option>
        </Select>
      </div> */}
      <div className="mb-3 ml-3">
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          placeholder="WacthList Type"
          defaultValue="Auction"
          onChange={handleWatchlistType}
        >
          <Option value={watchlistType1}>Auction</Option>
          <Option value={watchlistType2}>Auction Inventory</Option>
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
        <Table columns={tableColumns} dataSource={watchlist} rowKey="id" />
      </div>
    </Card>
  );
};

export default WatchlistList;
