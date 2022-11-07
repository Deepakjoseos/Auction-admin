import React, { useState, useEffect } from 'react';

import { Tabs, Form, message, Table, Menu, Input, Card, Select } from 'antd';
import { useHistory } from 'react-router-dom';

import moment from 'moment';

import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined
} from '@ant-design/icons';
import utils from 'utils';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import registrationService from 'services/registration';
import constantsService from 'services/constants';

const { Option } = Select;

const RegistrationList = (props) => {
  const history = useHistory();
  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [participantsConstants, setParticipantsConstants] = useState({});

  const getRegistration = async (query) => {
    const data = await registrationService.getRegistrations(query);
    if (data) {
      setList(data);
      setSearchBackupList(data);
      console.log(data, 'show-data');
    }
  };
  const getPaymentStatus = async () => {
    const data = await constantsService.getRegistrationConstant();
    if (data) {
      setPaymentStatus(data.paymentStatus);
      console.log(data, 'show-data');
    }
  };

  const getParticipantConstants = async () => {
    const data = await constantsService.getParticipant();
    if (data) {
      setParticipantsConstants(data);
      console.log(data, 'show-data');
    }
  };

  useEffect(() => {
    getPaymentStatus();
    getParticipantConstants();
  }, []);

  useEffect(() => {
    getRegistration(new URLSearchParams(searchParams));
  }, [searchParams]);

  // const viewDetails = (row) => {
  //   history.push(`/app/dashboards/registration/edit-registration/${row._id}`);
  // };

  const changeRegistrationStatus = async (row, newStatus) => {
    const data = await registrationService.updateRegistration(row._id, {
      status: newStatus,
      countedIn: row.countedIn,
      date: row.date,
      expiry: row.expiry,
      feeRemark: row.feeRemark,
      note: row.note,
      paymentDate: row.paymentDate
    });
    if (data) {
      getRegistration();
      message.success('Status changed!');
    }
  };

  const dropdownMenu = (row) => {
    return (
      <Menu>
        {/* {editPrivilege && (
          <Menu.Item onClick={() => viewDetails(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">View Details</span>
            </Flex>
          </Menu.Item>
        )} */}
        {editPrivilege &&
          paymentStatus.map((status) => {
            if (status !== row.status) {
              return (
                <Menu.Item
                  onClick={() => changeRegistrationStatus(row, status)}
                >
                  <Flex alignItems="center">
                    <EditOutlined />
                    <span className="ml-2">{status}</span>
                  </Flex>
                </Menu.Item>
              );
            }
          })}
      </Menu>
    );
  };

  const tableColumns = [
    {
      title: 'Participant email',
      dataIndex: 'participant',
      render: (participant) => (
        <Flex alignItems="center">{participant.email} </Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'fee')
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'fee')
    },
    {
      title: 'Mode',
      dataIndex: 'mode',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'fee')
    },
    {
      title: 'Registration Date',
      dataIndex: 'date',
      render: (date) => {
        return moment(parseInt(date)).format('L');
      }
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiry',
      render: (expiry) => {
        return moment(parseInt(expiry)).format('L');
      }
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      render: (paymentDate) => {
        return moment(parseInt(paymentDate)).format('L');
      }
    },
    {
      title: 'Fee Type',
      dataIndex: 'feeType',
      key: 'feeType'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    // {
    //   title: 'Bank Name',
    //   dataIndex: 'payment',
    //   render: (payment) => (
    //     <Flex alignItems="center">{payment.bankName}</Flex>
    //   ),
    //   // sorter: (a, b) => a.agent.name.localeCompare(b.booking.agent.name),
    // },
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
    <Flex className="mb-1" mobileFlex={false}>
      <div className="mr-md-3 mb-3">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e)}
        />
      </div>
      <Flex className="mb-3">
        <Form.Item name="status" label="Payment status" className="mr-md-3">
          <Select
            defaultValue="All"
            className="w-100"
            style={{ minWidth: 180 }}
            onChange={(value) => handleFilters('paymentStatus', value)}
            placeholder="Payment status"
          >
            <Option value="All">All</Option>
            {paymentStatus.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
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
      </Flex>{' '}
    </Flex>
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
export default RegistrationList;
