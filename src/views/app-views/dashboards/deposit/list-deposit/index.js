import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Tag, Button, Menu } from 'antd';
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

const DepositList = (props) => {
  let history = useHistory();

  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  const [paymentStatus, setPaymentStatus] = useState([]);

  useEffect(() => {
    getDeposits();
    getPaymentStatus();
  }, []);

  const getDeposits = async () => {
    const data = await depositService.getDeposits();
    if (data) {
      setList(data);
      setSearchBackupList(data);
      console.log(data, 'show-data');
    }
  };

  const getPaymentStatus = async () => {
    const data = await constantsService.getRegistrationConstant();
    if (data) {
      setPaymentStatus(Object.values(data.paymentStatus));
      console.log(data, 'show-data');
    }
  };

  const makeDeposit = () => {
    history.push(`/app/dashboards/deposit/make-deposit`);
  };

  const changeStatus = (row, newStatus) => {};

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
    <Flex className="mb-1" mobileFlex={false}>
      <div className="mr-md-3 mb-3">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e)}
        />
      </div>
    </Flex>
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
          <Table columns={tableColumns} dataSource={list} rowKey="id" />
        </div>
      </Card>
    </>
  );
};

export default DepositList;
