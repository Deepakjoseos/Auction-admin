import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Button, Menu } from 'antd';
import {
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import utils from 'utils';
import auctionInventoryService from 'services/auctionInventory';

const AuctionInventoryList = (props) => {
  let history = useHistory();
  const params = new URLSearchParams(props.location.search);
  const auctionId = params.get('auctionId');

  const { sellerId } = props;

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});


  useEffect(() => {
    const getInventories = async () => {
      const data = await auctionInventoryService.getInventories(
        auctionId ? `auctionId=${auctionId}` : ''
      );
      if (data) {
        setList(data);
        setSearchBackupList(data);
        console.log(data, 'show-data');
      }
    };
    getInventories();
  }, []);

  const dropdownMenu = (row) => {
    return (
      <Menu>
        <Menu.Item onClick={() => viewBiddings(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Biddings</span>
          </Flex>
        </Menu.Item>
        <Menu.Item onClick={() => viewComments(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Comments</span>
          </Flex>
        </Menu.Item>
      </Menu>
    );
  };


  const viewBiddings = (row) => {
    history.push(
      `/app/dashboards/seller-auction/bidding/bidding-list?inventoryId=${row._id}`
    );
  };

  const viewComments = (row) => {
    history.push(
      `/app/dashboards/seller-auction/comment/comment-list?inventoryId=${row._id}`
    );
  };

  const tableColumns = [
    {
      title: 'Auction Name',
      dataIndex: 'auction',
      render: (auction) => <Flex alignItems="center">{auction?.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },

    {
      title: 'chasisNumber',
      dataIndex: 'vehicleInfo',
      render: (vehicleInfo) => (
        <Flex alignItems="center">{vehicleInfo?.chasisNumber} </Flex>
      )
      //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: 'bidLimit',
      dataIndex: 'auction',
      render: (auction) => <Flex alignItems="center">{auction?.bidLimit} </Flex>
      //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: 'Start Time',
      dataIndex: 'auction',
      render: (auction) => {
        var d = new Date(Number(auction?.startTimestamp)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'business')
    },
    {
      title: 'End Time',
      dataIndex: 'auction',
      render: (auction) => {
        var d = new Date(Number(auction?.endTimestamp)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'business')
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      render: (createdBy) => <Flex alignItems="center">{createdBy?.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Updated By',
      dataIndex: 'updatedBy',
      render: (updatedBy) => <Flex alignItems="center">{updatedBy?.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          {<EllipsisDropdown menu={dropdownMenu(elm)} />}
        </div>
      )
    }
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
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
    </Flex>
  );

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default AuctionInventoryList;
