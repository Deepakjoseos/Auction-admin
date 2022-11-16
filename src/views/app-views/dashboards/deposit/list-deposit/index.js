import React, { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Input,
  Tag,
  Button,
  Menu,
  message,
  Form,
  Select
} from 'antd';
import {
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import utils from 'utils';
import depositService from 'services/deposit';
import constantsService from 'services/constants';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import useQueryFilters from 'hooks/useQueryFilters';
import participantService from 'services/Participant';

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

const pageSize = 8;

const DepositList = (props) => {
  let history = useHistory();

  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [paymentMode, setPaymentMode] = useState([]);
  const [participants, setParticipants] = useState([]);

  const {
    handleFilters,
    isLoading,
    onChangeCurrentPageNumber,
    setIsLoading,
    searchParams
  } = useQueryFilters({
    limit: pageSize,
    page: 1
  });

  useEffect(() => {
    getRegistrationConstants();
    getParticipants();
  }, []);

  useEffect(() => {
    getDeposits(new URLSearchParams(searchParams));
  }, [searchParams]);

  const getDeposits = async (query) => {
    setIsLoading(true);
    const data = await depositService.getDeposits(query);
    if (data) {
      setList(data);
      setSearchBackupList(data);
      console.log(data, 'show-data');
    }
    setIsLoading(false);
  };

  const getParticipants = async () => {
    const data = await participantService.getAllParticipants();
    setParticipants(data);
  };

  const getRegistrationConstants = async () => {
    const data = await constantsService.getRegistrationConstant();
    if (data) {
      setPaymentStatus(data.paymentStatus);
      setPaymentMode(data.paymentModes);
      console.log(data, 'show-data');
    }
  };

  const makeDeposit = () => {
    history.push(`/app/dashboards/deposit/make-deposit`);
  };

  const changeStatus = async (row, newStatus) => {
    const data = await depositService.updateDeposit(row._id, {
      paymentStatus: newStatus,
      remark: row.remark,
      date: row.date,
      countedIn: row.countedIn,
      paymentMode: row.paymentMode,
      bank: {
        name: row.bank.name,
        branch: row.bank.branch,
        receiptNumber: row.bank.receiptNumber
      },
      businessType: row.businessType,
      recieptUrl: row.recieptUrl
    });
    if (data) {
      getDeposits();
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
                <Menu.Item onClick={() => changeStatus(row, status)}>
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

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'amount')
    },
    {
      title: 'Counted In',
      dataIndex: 'countedIn',
      render: (date) => {
        var d = new Date(Number(date)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'countedIn')
    },
    {
      title: 'Deposit Date',
      dataIndex: 'createdAt',
      render: (date) => {
        var d = new Date(Number(date)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'createdAt')
    },
    {
      title: 'Business Type',
      dataIndex: 'businessType',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'businessType')
    },
    {
      title: 'Payment Mode',
      dataIndex: 'paymentMode',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'paymentMode')
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'remark')
    },
    {
      title: 'Participant',
      dataIndex: 'participant',
      render: (participant) => participant?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Manager',
      dataIndex: 'relationshipManager',
      render: (relationshipManager) => relationshipManager?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    // {
    //   title: "Reciept",
    //   dataIndex: "recieptUrl",
    //   sorter: (a, b) => utils.antdTableSorter(a, b, "recieptUrl"),
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
      title: 'Payment status',
      dataIndex: 'paymentStatus',
      render: (paymentStatus) => (
        <Flex alignItems="paymentStatus">{paymentStatus}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'paymentStatus')
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

    // {
    //   title: "",
    //   dataIndex: "actions",
    //   render: (_, elm) => (
    //     <div className="text-right">
    //       {window.localStorage.getItem("auth_type") === "Admin" ? (
    //         <EllipsisDropdown menu={dropdownMenu(elm)} />
    //       ) : (
    //         currentSubAdminRole?.edit && (
    //           <EllipsisDropdown menu={dropdownMenu(elm)} />
    //         )
    //       )}
    //     </div>
    //   ),
    // },
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  const filters = () => (
    <Form>
      <Flex
        className="mb-1"
        mobileFlex={false}
        flexDirection="column"
        alignItems="start"
      >
        <div className="mr-md-3 mb-3">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e)}
          />
        </div>
        <Flex className="mb-3">
          <Form.Item
            name="participantName"
            label="Participant name"
            className="mr-md-3"
          >
            <Select
              defaultValue="All"
              onChange={(value) => handleFilters('participantId', value)}
              placeholder="Participant"
              style={{ minWidth: 120 }}
            >
              <Option value="All">All</Option>
              {participants.map((participant) => (
                <Option value={participant._id}>{participant.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Payment status" className="mr-md-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 120 }}
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
          <Form.Item name="mode" label="Payment mode" className="mr-md-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 120 }}
              onChange={(value) => handleFilters('paymentMode', value)}
              placeholder="Payment mode"
            >
              <Option value="All">All</Option>
              {paymentMode.map((mode) => (
                <Option key={mode} value={mode}>
                  {mode}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Flex>
      </Flex>
    </Form>
  );

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {filters()}
          <div>
            {addPrivilege && (
              <Button
                onClick={makeDeposit}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                Make Deposit
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
              total: 24, // TODO: get the total count from API
              defaultCurrent: 1,
              defaultPageSize: pageSize,
              onChange: onChangeCurrentPageNumber
            }}
            loading={isLoading}
          />
        </div>
      </Card>
    </>
  );
};

export default DepositList;
