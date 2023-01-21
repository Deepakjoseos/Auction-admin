import React, { useEffect, useState } from 'react';
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
  Col,
  Row
} from 'antd';
import qs from 'qs'
import _, { get } from 'lodash'
// import BrandListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import utils from 'utils';
import authAdminService from 'services/auth/admin';
import EditRoleSubAdmin from './EditRoleSubAdmin';
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

// const pageSize = 8;

const UserList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [agentIdForPassword, setAgentIdForPassword] = useState(null);
  const [agentPassword, setAgentPassword] = useState(null);
  const [isEditRoleFormOpen, setIsEditRoleFormOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const [filterEnabled, setFilterEnabled] = useState(false)
  const [statuses,setStatuses] = useState([])

  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  })

  // const {
  //   handleFilters,
  //   isLoading,
  //   onChangeCurrentPageNumber,
  //   setIsLoading,
  //   searchParams
  // } = useQueryFilters({
  //   limit: pageSize,
  //   page: 1
  // });

  const getUsers = async (paginationParams = {}, filterParams) => {
    setIsLoading(true);
    const data = await authAdminService.getAllSubAdmins(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)    
      );
    // console.log(data);
    if (data) {
      setList(data.data);
      setSearchBackupList(data.data);
      // Pagination
      setPagination({
        ...paginationParams.pagination,
        total: data.count,
      })
    }
    console.log(data,'users')
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers({
      pagination,
    });
  }, []);

  const showModal = (row) => {
    setIsModalVisible(true);
    setAgentIdForPassword(row.id);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setAgentIdForPassword(null);
    setAgentPassword(null);
  };
  
  // pagination generator
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  })
  
  
    // On pagination Change
    const handleTableChange = (newPagination) => {
      getUsers(
        { 
          pagination: newPagination,
        },
        filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
      )
    }
  
    const resetPagination = () => ({
      ...pagination,
      current: 1,
      pageSize: 5,
    })
  


// Filter Submit
const handleFilterSubmit = async () => {
  setPagination(resetPagination())

  form
    .validateFields()
    .then(async (values) => {
      setFilterEnabled(true)
      // Removing falsy Values from values
      const sendingValues = _.pickBy(values, _.identity)
      getUsers({ pagination: resetPagination() }, sendingValues)
    })
    .catch((info) => {
      console.log('info', info)
      setFilterEnabled(false)
    })
}

const handleClearFilter = async () => {
  form.resetFields()

  setPagination(resetPagination())
  getUsers({ pagination: resetPagination() }, {})
  setFilterEnabled(false)
}

  // Dropdown menu for each row
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setIsEditRoleFormOpen(true);
          setSelectedUserId(row._id);
        }}
      >
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">Edit Role</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const addLottery = () => {
    history.push(`/app/dashboards/user/add-user`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/user/edit-user/${row._id}`);
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => {
        return <Flex alignItems="center">{name}</Flex>;
      },
      sorter: (a, b) => a.name?.first?.localeCompare(b?.name?.first)
    },
    {
      title: 'Username',
      dataIndex: 'username',
      render: (username) => {
        return <Flex alignItems="center">{username}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'username')
    },

    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'email')
    },

    {
      title: 'Contact',
      dataIndex: 'contact',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'contact')
    },

    {
      title: 'Employee Type',
      dataIndex: 'employeeType',
      render: (employeeType) => (
        <Flex alignItems="center">{employeeType?.name}</Flex>
      )
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'employeeType')
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

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
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
  const editAgentPassword = async () => {
    console.log('agentpassword', agentPassword);
    // if (agentPassword?.length > 0) {
    //   const res = await agentService.editPassword(agentIdForPassword, {
    //     password: agentPassword,
    //   });
    //   if (res) {
    //     notification.success({
    //       message: "Edited Password successfully",
    //     });
    //     handleCancel();
    //     setAgentPassword(null);
    //     setAgentIdForPassword(null);
    //   }
    // }
  };
  // Table Filters JSX Elements
  const filters = () => (
<Form
    layout="vertical"
    form={form}
    name="filter_form"
    className="ant-advanced-search-form"
  >
    <Row gutter={8} align="bottom">
     <Col md={6} sm={24} xs={24} lg={6}>
      <Form.Item name="search" label="Search">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          // onChange={(e) => onSearch(e)}
        />
        </Form.Item>
      </Col>
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
      <Col style={{marginLeft:"40px"}} className="mb-4">
          <Button type="primary" onClick={handleFilterSubmit}>
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
    <>
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
              Add User
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={list}
            rowKey="id"
            // pagination={{
            //   total: 24, // TODO: get the total count from API
            //   defaultCurrent: 1,
            //   defaultPageSize: pageSize,
            //   onChange: onChangeCurrentPageNumber
            // }}
            scroll={{
              x: true,
            }}
            onChange={handleTableChange}
            pagination={pagination}
            loading={isLoading}
          />
        </div>
      </Card>
      {/* <Modal
        footer={false}
        title="Edit Password"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form.Item
          label="Password"
          name="password"
          //   onChange={(e)=>setAgentIdForPassword(e.target.value)}
        >
          <Input.Password
            value={agentPassword}
            onChange={(e) => setAgentPassword(e.target.value)}
          />

          <Form.Item className="mt-2" wrapperCol={{ offset: 18, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={editAgentPassword}
            >
              Submit
            </Button>
          </Form.Item>
        </Form.Item>
      </Modal> */}
      <EditRoleSubAdmin
        isFormOpen={isEditRoleFormOpen}
        setIsFormOpen={setIsEditRoleFormOpen}
        userId={selectedUserId}
      />
    </>
  );
};

export default UserList;
