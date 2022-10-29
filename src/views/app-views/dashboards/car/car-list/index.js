import React, { useEffect, useState } from 'react';
import { Card, Table, Select, Input, Button, Menu, Tag } from 'antd';
// import InformationListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import utils from 'utils';
import carService from 'services/car';
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

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const carRole = user.roles.find((role) => role.module === 'CAR');
      console.log('carRole', carRole);
      setCurrentSubAdminRole(carRole);
    }
  }, [user]);

  useEffect(() => {
    const getCars = async () => {
      const data = await carService.getCars();
      if (data) {
        setList(data);
        setSearchBackupList(data);
        console.log(data, 'show-data');
      }
    };
    getCars();
  }, []);

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
        {/* <Menu.Item onClick={() => deleteRow(row)}>
            <Flex alignItems="center">
              <DeleteOutlined />
              <span className="ml-2">
                {selectedRows.length > 0
                  ? `Delete (${selectedRows.length})`
                  : "Delete"}
              </span>
            </Flex>
          </Menu.Item> */}
      </Menu>
    );
  };

  const addProduct = () => {
    history.push(`/app/dashboards/car/add-car`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/car/edit-car/${row._id}`);
  };

  // const deleteRow = async (row) => {
  //   const resp = await carService.deleteCar(row.id);

  //   if (resp) {
  //     const objKey = "id";
  //     let data = list;
  //     if (selectedRows.length > 1) {
  //       selectedRows.forEach((elm) => {
  //         data = utils.deleteArrayRow(data, objKey, elm.id);
  //         setList(data);
  //         setSelectedRows([]);
  //       });
  //     } else {
  //       data = utils.deleteArrayRow(data, objKey, row.id);
  //       setList(data);
  //     }
  //   }
  // };

  const tableColumns = [
    {
      title: 'Car',
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
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   render: (description) => (
    //     <div dangerouslySetInnerHTML={{ __html: description }}></div>
    //   ),
    // },
    {
      title: 'Vechile Type',
      dataIndex: 'vehicleType',
      render: (vehicleType) => vehicleType?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'vehicleType')
    },
    {
      title: 'Price Range',
      dataIndex: 'priceRange',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'priceRange')
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      render: (brand) => brand?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'color')
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
              onClick={addProduct}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Car
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
