import React, { useEffect, useState } from 'react';
import { Card, Table, Select, Input, Button, Menu, Tag, Form } from 'antd';
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
import participantService from 'services/Participant';
import { useSelector } from 'react-redux';
import constantsService from 'services/constants';

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

const ParticipantList = (props) => {
  let history = useHistory();

  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [participantsConstants, setParticipantsConstants] = useState({});
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  const [searchParams, setSearchParams] = useState({});

  const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (user) {
  //     const paricipantRole = user.roles.find(
  //       (role) => role.module === 'PARTICIPANT'
  //     );
  //     console.log('paricipantRole', paricipantRole);
  //     setCurrentSubAdminRole(paricipantRole);
  //   }
  // }, [user]);

  // const [participants, setParticipants] = useState([])

  const getParticipantConstants = async () => {
    const data = await constantsService.getParticipant();
    if (data) {
      setParticipantsConstants(data);
      console.log(data, 'show-data');
    }
  };

  useEffect(() => getParticipantConstants(), []);

  useEffect(() => {
    const getAllParticipants = async () => {
      const data = await participantService.getAllParticipants(
        new URLSearchParams(searchParams)
      );
      if (data) {
        setList(data);
        setSearchBackupList(data);
        console.log(data, 'show-data');
      }
    };
    getAllParticipants();
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
      </Menu>
    );
  };

  const addProduct = () => {
    history.push(`/app/dashboards/participant/add-participant`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/participant/edit-participant/${row._id}`);
  };

  //   const deleteRow = async (row) => {
  //     const resp = await informationService.deleteInformation(row.id)

  //     if (resp) {
  //       const objKey = 'id'
  //       let data = list
  //       if (selectedRows.length > 1) {
  //         selectedRows.forEach((elm) => {
  //           data = utils.deleteArrayRow(data, objKey, elm.id)
  //           setList(data)
  //           setSelectedRows([])
  //         })
  //       } else {
  //         data = utils.deleteArrayRow(data, objKey, row.id)
  //         setList(data)
  //       }
  //     }
  //   }

  const tableColumns = [
    {
      title: 'id',
      dataIndex: '_id',
      sorter: (a, b) => utils.antdTableSorter(a, b, '_id')
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'username')
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact'
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact'
    },
    {
      title: 'Participant Type',
      dataIndex: 'participantType'
    },
    {
      title: 'GST',
      dataIndex: 'gst',
      render: (text, row) => {
        return <span>{row.gst ? 'Yes' : 'No'}</span>;
      }
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

  const handleFilters = (key, value) => {
    if (value !== 'All') {
      setSearchParams((prevSearchParams) => ({
        ...prevSearchParams,
        [key]: value
      }));
    } else {
      setSearchParams((prevSearchParams) => {
        const newSearchParams = { ...prevSearchParams };
        delete newSearchParams[key];
        return newSearchParams;
      });
    }
  };

  const filters = () => (
    <Form>
      <Flex className="mb-1" mobileFlex={false}>
        <div className="mr-md-3 mb-3">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e)}
          />
        </div>
        <Flex className="mb-3">
          <Form.Item name="status" label="Status" className="mr-md-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value) => handleFilters('status', value)}
              placeholder="Status"
            >
              <Option value="All">All</Option>
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="participantType"
            label="Participant Type"
            className="mr-md-3"
          >
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value) => handleFilters('participantType', value)}
              placeholder="Participant Type"
            >
              <Option value="All">All</Option>
              {participantsConstants.ParticipantType?.map((type) => (
                <Option value={type} key={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="userType" label="User Type" className="mr-md-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value) => handleFilters('userType', value)}
              placeholder="User Type"
            >
              <Option value="All">All</Option>
              {participantsConstants.UserType?.map((type) => (
                <Option value={type} key={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Flex>
      </Flex>
    </Form>
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
              Add Participant
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

export default ParticipantList;
