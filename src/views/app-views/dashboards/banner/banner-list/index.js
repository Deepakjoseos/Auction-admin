import React, { useEffect, useState } from 'react';
import { Card, Table, Select, Input, Button, Menu, Tag,Form,Row , Col } from 'antd';
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
const BannerList = (props) => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)

  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  useEffect(() => {
    // Getting Lotteries List to display in the table
    const getBanners = async (filterParams) => {
      setIsLoading(true);
      const data = await bannerService.getBanners(
        qs.stringify(filterParams)    
        );
      if (data) {
        setList(data);
        setSearchBackupList(data);
        console.log(data, 'show-data');
      }
      setIsLoading(false);
    };
    getBanners();
  }, []);

  const { user } = useSelector((state) => state.auth);

  const getBanners = async (filterParams) => {
    setIsLoading(true);
    const data = await bannerService.getBanners(
      qs.stringify(filterParams)    
      );
    if (data) {
      setList(data);
      setSearchBackupList(data);
      console.log(data, 'show-data');
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getBanners();
    // fetchConstants()
  }, []);

  const dropdownMenu = (row) => (
    <Menu>
      {editPrivilege && (
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Details</span>
          </Flex>
        </Menu.Item>
      )}
      {deletePrivilege && (
        <Menu.Item onClick={() => deleteRow(row)}>
          <Flex alignItems="center">
            <DeleteOutlined />
            <span className="ml-2">
              {selectedRows.length > 0
                ? `Delete (${selectedRows.length})`
                : 'Delete'}
            </span>
          </Flex>
        </Menu.Item>
      )}
    </Menu>
  );

  const addBanner = () => {
    history.push(`/app/dashboards/banner/add-banner`);
  };

  const viewDetails = (row) => {
    console.log('row', row);
    history.push(`/app/dashboards/banner/edit-banner/${row._id}`);
  };
  const deleteRow = async (row) => {
    const resp = await bannerService.deleteBanner(row._id);
    if (resp) {
      getBanners();
    }
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Banner',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            size={60}
            type="square"
            src={record.image}
            name={record.name}
          />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          {(editPrivilege || deletePrivilege) && (
            <EllipsisDropdown menu={dropdownMenu(elm)} />
          )}
        </div>
      )
    }
  ];

  // Filter Submit
const handleFilterSubmit = async () => {
  // setPagination(resetPagination())

  form
    .validateFields()
    .then(async (values) => {
      setFilterEnabled(true)
      // Removing falsy Values from values
      const sendingValues = _.pickBy(values, _.identity)
      getBanners( sendingValues)
    })
    .catch((info) => {
      console.log('info', info)
      setFilterEnabled(false)
    })
}

const handleClearFilter = async () => {
  form.resetFields()

  // setPagination(resetPagination())
  getBanners()
  setFilterEnabled(false)
}

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

  // Table Filters JSX Elements
  const filters = () => (
    // <Flex className="mb-1" mobileFlex={false}>
    //   <div className="mr-md-3 mb-3">
    //     <Input
    //       placeholder="Search"
    //       prefix={<SearchOutlined />}
    //       onChange={(e) => onSearch(e)}
    //     />
    //   </div>
    //   <div className="mb-3">
    //     <Select
    //       defaultValue="All"
    //       className="w-100"
    //       style={{ minWidth: 180 }}
    //       onChange={handleShowStatus}
    //       placeholder="Status"
    //     >
    //       <Option value="All">All</Option>
    //       <Option value="Active">Active</Option>
    //       <Option value="Hold">Hold</Option>
    //     </Select>
    //   </div>
    // </Flex>
    <Form
    layout="vertical"
    form={form}
    name="filter_form"
    className="ant-advanced-search-form"
  >
    <Row gutter={8} align="bottom">
      <Col md={6} sm={24} xs={24} lg={6}>
      <Form.Item name="status" label="Status">
        <Select
          // defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          // onChange={handleShowStatus}
          placeholder="Status"
        >
          <Option value="">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Hold">Hold</Option>
        </Select>
        </Form.Item>
      </Col>
      <Col className="mb-4">
          <Button style={{marginLeft:"80px"}} type="primary" onClick={handleFilterSubmit}>
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
        <div>
          {addPrivilege && (
            <Button
              onClick={addBanner}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Banner
            </Button>
          )}
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default BannerList;
