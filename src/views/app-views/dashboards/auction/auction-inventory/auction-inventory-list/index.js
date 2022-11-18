import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Button, Menu, Form, Row, Col, Select } from 'antd';
import {
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import utils from 'utils';
import { useSelector } from 'react-redux';
import auctionInventoryService from 'services/auctionInventory';
import useQueryFilters from 'hooks/useQueryFilters';

const { Option } = Select;

const pageSize = 8;

const AuctionInventoryList = (props) => {
  let history = useHistory();
  const params = new URLSearchParams(props.location.search);
  const auctionId = params.get('auctionId');

  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [registrationNumberList, setRegistrationNumberList] = useState([]);
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

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getGroups = async () => {
      setIsLoading(true);
      const data = await auctionInventoryService.getInventories(
        new URLSearchParams(searchParams)
      );
      if (data) {
        setList(data.inventories);
        setSearchBackupList(data.inventories);
        setTotalCount(data.pages * pageSize);
        console.log(data, 'show-data');
      }
      setIsLoading(false);
    };
    getGroups();
  }, [searchParams]);

  const dropdownMenu = (row) => {
    return (
      <Menu>
        {editPrivilege && (
          <Menu.Item onClick={() => viewDetails(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">View Details</span>
            </Flex>
          </Menu.Item>
        )}
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

  const addGroup = () => {
    history.push(
      `/app/dashboards/auction/auction-inventory/add-auction-inventory`
    );
  };

  const viewDetails = (row) => {
    history.push(
      `/app/dashboards/auction/auction-inventory/edit-auction-inventory/${row._id}`
    );
  };

  const viewBiddings = (row) => {
    history.push(
      `/app/dashboards/auction/bidding/bidding-list?inventoryId=${row._id}`
    );
  };

  const viewComments = (row) => {
    history.push(
      `/app/dashboards/auction/comment/comment-list?inventoryId=${row._id}`
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
      title: 'Registration number',
      dataIndex: 'registrationNumber',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'registrationNumber')
    },
    {
      title: 'bidLimit',
      dataIndex: 'auction',
      render: (auction) => <Flex alignItems="center">{auction?.bidLimit} </Flex>
      //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: 'Start Time',
      dataIndex: 'startTimestamp',
      render: (startTimestamp) => {
        var d = new Date(Number(startTimestamp)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'startTimestamp')
    },
    {
      title: 'End Time',
      dataIndex: 'endTimestamp',
      render: (endTimestamp) => {
        var d = new Date(Number(endTimestamp)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'endTimestamp')
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      render: (createdBy) => <Flex alignItems="center">{createdBy?.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'createdBy')
    },
    {
      title: 'Updated By',
      dataIndex: 'updatedBy',
      render: (updatedBy) => <Flex alignItems="center">{updatedBy?.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'updatedBy')
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
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
        </Flex>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="registrationNumber" label="Registration Number">
            <Select
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
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
        <div>
          {addPrivilege && (
            <Button
              onClick={addGroup}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Upload Auction Inventory
            </Button>
          )}
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
          pagination={{
            total: totalCount,
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

export default AuctionInventoryList;
