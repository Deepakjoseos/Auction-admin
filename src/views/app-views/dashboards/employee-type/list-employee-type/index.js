import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  Modal,
  Form,
  Row,
  notification
} from 'antd';
import qs from 'qs'
import _, { get } from 'lodash'
import {
  EyeOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';

import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import utils from 'utils';

import employeeTypeService from 'services/employeeType';

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

const EmployeeTypeList = (props) => {
  const [employeeTypeList, setEmployeeTypeList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [form] = Form.useForm()
  const [filterEnabled, setFilterEnabled] = useState(false)

  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  const history = useHistory();

  const getEmployeeType = async (filterParams) => {
    const data = await employeeTypeService.getEmployeeTypes(
      // qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams) );
    if (data) {
      setEmployeeTypeList(data);
      setSearchBackupList(data);
    }
  };

  useEffect(() => {
    getEmployeeType();
  }, []);

  const addLottery = () => {
    history.push(`/app/dashboards/employee-type/add-employee-type`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/employee-type/edit-employee-type/${row._id}`);
  };

  const deleteRow = async (row) => {
    const resp = await employeeTypeService.delete(row._id);
    if (resp) {
      getEmployeeType();
    }
  };

// Filter Submit
const handleFilterSubmit = async () => {
  // setPagination(resetPagination())

  form
    .validateFields()
    .then(async (values) => {
      setFilterEnabled(true)
      // Removing falsy Values from values
      const sendingValues = _.pickBy(values, _.identity)
      getEmployeeType( sendingValues)
    })
    .catch((info) => {
      console.log('info', info)
      setFilterEnabled(false)
    })
}

const handleClearFilter = async () => {
  form.resetFields()

  // setPagination(resetPagination())
  getEmployeeType()
  setFilterEnabled(false)
}



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
        {deletePrivilege && (
          <Menu.Item onClick={() => deleteRow(row)}>
            <Flex alignItems="center">
              <DeleteOutlined />
              <span className="ml-2">Delete</span>
            </Flex>
          </Menu.Item>
        )}
      </Menu>
    );
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => {
        return <Flex alignItems="center">{name}</Flex>;
      },
      sorter: (a, b) => a.name.localeCompare(b?.name)
    },

    {
      title: 'Permissions',
      key: 'permissions',
      dataIndex: 'permissions',
      render: (permissions) => (
        <span>
          {permissions.map((permission) => {
            if (permission.add || permission.edit || permission.delete) {
              return (
                <Tag
                  style={{ marginBottom: '1rem' }}
                  color={'geekblue'}
                  key={permission.module}
                >
                  {permission.module.toUpperCase()}
                </Tag>
              );
            }
          })}
        </span>
      ),
      sorter: (a, b) => a.permissions.length > b.permissions.length
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

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value
      ? employeeTypeList
      : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setEmployeeTypeList(data);
  };

  // Filter Status Handler
  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status';
      const data = utils.filterArray(searchBackupList, key, value);
      setEmployeeTypeList(data);
    } else {
      setEmployeeTypeList(searchBackupList);
    }
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
              Add Employee Type
            </Button>
          )}
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={employeeTypeList}
          rowKey="id"
        />
      </div>
    </Card>
  );
};

export default EmployeeTypeList;
