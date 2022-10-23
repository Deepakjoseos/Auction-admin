import React, { useEffect, useState } from 'react';
import { Card, Table, Select, Input, Button, Menu, Tag } from 'antd';
// import InformationListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import utils from 'utils';

import groupService from 'services/group';

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
const GroupList = (props) => {
  let history = useHistory();

  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  const AUTH_TYPE = window.localStorage.getItem('auth_type');
  useEffect(() => {
    const getGroups = async () => {
      const data = await groupService.getGroups();
      if (data) {
        setList(data);
        console.log(data);
        setSearchBackupList(data);
        console.log(data, 'show-data');
      }
    };
    getGroups();
  }, []);

  const dropdownMenu = (row) => {
    return (
      editPrivilege && (
        <Menu>
          <Menu.Item onClick={() => viewDetails(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">View Details</span>
            </Flex>
          </Menu.Item>

          <Menu.Item onClick={() => uploadMembers(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">Upload Members</span>
            </Flex>
          </Menu.Item>
        </Menu>
      )
    );
  };

  const addGroup = () => {
    history.push(`/app/dashboards/general/group/add-group`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/general/group/edit-group/${row._id}`);
  };

  const uploadMembers = (row) => {
    history.push(`/app/dashboards/general/group/upload-members/${row._id}`);
  };

  const tableColumns = [
    // {
    //   title: 'Information',
    //   dataIndex: 'name',
    //   render: (_, record) => (
    //     <div className="d-flex">
    //       <AvatarStatus
    //         size={60}
    //         type="square"
    //         src={record.image}
    //         name={record.name}
    //       />
    //     </div>
    //   ),
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Business',
      dataIndex: 'business',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'business')
    },
    // {
    //   title: "Vehicle",
    //   dataIndex: "vehicle",
    //   render: (_, rec) => <>{rec.vehicleType.name}</>,
    //   sorter: (a, b) => utils.antdTableSorter(a, b, "vehicle"),
    // },

    // {
    //   title: "Region",
    //   dataIndex: "region",
    //   render: (_, rec) => <>{rec.region.name}</>,
    //   sorter: (a, b) => utils.antdTableSorter(a, b, "region"),
    // },

    // {
    //   title: "City",
    //   dataIndex: "city",
    //   render: (_, rec) => <>{rec.city.name}</>,
    //   sorter: (a, b) => utils.antdTableSorter(a, b, "city"),
    // },
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
          {editPrivilege && <EllipsisDropdown menu={dropdownMenu(elm)} />}
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
          {addPrivilege && (
            <Button
              onClick={addGroup}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Group
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

export default GroupList;
