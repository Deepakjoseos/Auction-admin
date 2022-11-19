import React, { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Input,
  Button,
  Menu,
  DatePicker,
  Col,
  Row,
  Form
} from 'antd';
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
import useQueryFilters from 'hooks/useQueryFilters';

const pageSize = 8;

const AuctionInventoryList = (props) => {
  let history = useHistory();
  const params = new URLSearchParams(props.location.search);
  const auctionId = params.get('auctionId');

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});

  const [form] = Form.useForm();

  const {
    handleFilters,
    isLoading,
    onChangeCurrentPageNumber,
    setIsLoading,
    searchParams,
    totalCount,
    setTotalCount
  } = useQueryFilters(
    auctionId
      ? {
          limit: pageSize,
          page: 1,
          auctionId: auctionId
        }
      : {
          limit: pageSize,
          page: 1
        }
  );

  useEffect(() => {
    const getInventories = async () => {
      const data = await auctionInventoryService.getSellerInventories(
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
    <Form
      layout="vertical"
      form={form}
      name="filter_form"
      className="ant-advanced-search-form"
    >
      <Row gutter={8} align="bottom">
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="registrationNumber" label="Registration Number">
            {/* <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Registration Number"
            >
              {registrationNumberList.map((reg) => (
                <Option value={reg}> {reg} </Option>
              ))}
            </Select> */}
            <Input
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Registration Number"
              onChange={(e) =>
                handleFilters('registrationNumber', e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name={'startTimestamp'} label="Start Date">
            <DatePicker
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value, dateString) =>
                handleFilters('startTimestamp', new Date(value).getTime())
              }
            />
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name={'endTimestamp'} label="End Date">
            <DatePicker
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value, dateString) =>
                handleFilters('endTimestamp', new Date(value).getTime())
              }
            />
          </Form.Item>
        </Col>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
        </Flex>
      </Row>
    </Form>
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
