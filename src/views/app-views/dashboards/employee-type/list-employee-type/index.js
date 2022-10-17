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

const EmployeeTypeList = () => {
  const [employeeTypeList, setEmployeeTypeList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);

  const history = useHistory();

  const getEmployeeType = async () => {
    const data = await employeeTypeService.getEmployeeTypes();
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

  const dropdownMenu = (row) => {
    if (window.localStorage.getItem('auth_type') === 'Admin') {
      return (
        <Menu>
          <Menu.Item onClick={() => viewDetails(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">View Details</span>
            </Flex>
          </Menu.Item>
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
      title: 'Name',
      dataIndex: 'name',
      render: (name) => {
        return <Flex alignItems="center">{name}</Flex>;
      },
      sorter: (a, b) => a.name.localeCompare(b?.first)
    },

    {
      title: 'Permissions',
      key: 'permissions',
      dataIndex: 'permissions',
      render: (permissions) => (
        <span>
          {permissions.map((permission) => {
            if (Object.values(permission).includes(true)) {
              return (
                <Tag color={'geekblue'} key={permission.module}>
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
          <EllipsisDropdown menu={dropdownMenu(elm)} />
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
    <Flex className="mb-1" mobileFlex={false}>
      <div className="mr-md-3 mb-3">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e)}
        />
      </div>
      <div className="mb-3">
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
      </div>
    </Flex>
  );

  return (
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
            Add Employee Type
          </Button>
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
