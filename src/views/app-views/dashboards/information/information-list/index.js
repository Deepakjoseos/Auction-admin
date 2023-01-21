import React, { useEffect, useState, useMemo } from 'react';
import { Card, Table, Select, Input, Button, Menu, Tag,Form, Row, Col } from 'antd';
// import InformationListData from 'assets/data/product-list.data.json'
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
import informationService from 'services/information';
import { TruncateLines } from 'react-truncate-lines';
import useUserPrivilege from 'hooks/useUserPrivilege';

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
const InformationList = (props) => {
  let history = useHistory();

  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)

  const getInformations = async (filterParams) => {
    const data = await informationService.getInformations(
      qs.stringify(filterParams)    
      );
    if (data) {
      setList(data);
      setSearchBackupList(data);
      console.log(data, 'show-data');
    }
  };
  useEffect(() => {
    getInformations();
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

  const addProduct = () => {
    history.push(`/app/dashboards/information/add-information`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/information/edit-information/${row._id}`);
  };
  const deleteRow = async (row) => {
    const resp = await informationService.deleteInformation(row._id);
    if (resp) {
      getInformations();
    }
  };

  const handleFilterSubmit = async () => {
    // setPagination(resetPagination())
  
    form
      .validateFields()
      .then(async (values) => {
        setFilterEnabled(true)
        // Removing falsy Values from values
        const sendingValues = _.pickBy(values, _.identity)
        getInformations( sendingValues)
      })
      .catch((info) => {
        console.log('info', info)
        setFilterEnabled(false)
      })
  }
  
  const handleClearFilter = async () => {
    form.resetFields()
  
    // setPagination(resetPagination())
    getInformations()
    setFilterEnabled(false)
  }

  const tableColumns = [
    {
      title: 'Information',
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
      title: 'Description',
      dataIndex: 'description',
      render: (description) => (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      )
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'priority')
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
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      )
    }
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status';
      const data = utils.filterArray(searchBackupList, key, value);
      setList(data);
    } else {
      setList(searchBackupList);
    }
  };

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
          {/* {window.localStorage.getItem('auth_type') === 'SubAdmin' ? (
            <>
              {currentSubAdminRole?.add && (
                <Button
                  onClick={addProduct}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add Information
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={addProduct}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Information
            </Button>
          )} */}
          {addPrivilege && (
            <Button
              onClick={addProduct}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Information
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

export default InformationList;
