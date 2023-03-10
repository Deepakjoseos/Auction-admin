import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Menu, Select } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import utils from 'utils';
import participantService from 'services/Participant';
import { useHistory } from 'react-router';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import useQueryFilters from 'hooks/useQueryFilters';

const { Option } = Select;

const WalletList = (props) => {
  const history = useHistory();

  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [participants, setParticipants] = useState([]);

  const { handleFilters, isLoading, setIsLoading, searchParams } =
    useQueryFilters();

  useEffect(() => {
    if (searchParams?.participantId) {
      return getParticipantById(searchParams.participantId);
    }

    getParticipantsWallets(searchParams);
  }, [searchParams]);

  useEffect(() => {
    getParticipants();
  }, []);

  const getParticipantsWallets = async (query) => {
    setIsLoading(true);
    const data = await participantService.getAllParticipants(
      new URLSearchParams(query)
    );
    if (data) {
      const wallets = data.filter((dat) => dat?.wallet);
      setList(wallets);
      setSearchBackupList(wallets);
      console.log(wallets, 'show-data');
    }
    setIsLoading(false);
  };

  const getParticipants = async () => {
    const data = await participantService.getAllParticipants();
    setParticipants(data);
  };

  const getParticipantById = async (id) => {
    setIsLoading(true);
    const data = await participantService.getParticipantById(id);
    if (data) {
      setList([data]);
      setSearchBackupList([data]);
      console.log(data, 'show-data');
    }
    setIsLoading(false);
  };

  const dropdownMenu = (row) => (
    <Menu>
      {editPrivilege && (
        <Menu.Item onClick={() => updateBuyingLimit(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">Update Buying LImit</span>
          </Flex>
        </Menu.Item>
      )}
    </Menu>
  );

  const updateBuyingLimit = (row) => {
    history.push(`/app/dashboards/wallet/update-buying-limit/${row._id}`);
  };

  const tableColumns = [
    {
      title: 'Participant',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Balance',
      dataIndex: 'wallet',
      render: (wallet) => wallet?.balance,
      sorter: (a, b) => a.balance - b.balance
    },
    {
      title: 'Security Deposit',
      dataIndex: 'wallet',
      render: (wallet) => wallet?.securityDeposit,
      sorter: (a, b) => a.securityDeposit - b.securityDeposit
    },
    {
      title: 'Initial Buying Limit',
      dataIndex: 'wallet',
      render: (wallet) => wallet?.initialBuyingLimit,
      sorter: (a, b) => a.initialBuyingLimit - b.initialBuyingLimit
    },
    {
      title: 'Current Buying Limit',
      dataIndex: 'wallet',
      render: (wallet) => wallet?.currentBuyingLimit,
      sorter: (a, b) => a.currentBuyingLimit - b.currentBuyingLimit
    },
    {
      title: 'Used Buying Limit',
      dataIndex: 'wallet',
      render: (wallet) => wallet?.usedBuyingLimit,
      sorter: (a, b) => a.usedBuyingLimit - b.usedBuyingLimit
    },
    {
      title: 'Blocked Buying Limit',
      dataIndex: 'wallet',
      render: (wallet) => wallet?.blockedAmount,
      sorter: (a, b) => a.blockedAmount - b.blockedAmount
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

  const filters = () => (
    <Flex className="mb-1" mobileFlex={false}>
      <div className="mr-md-3 mb-3">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e)}
        />
      </div>
      <div className="mr-md-3 mb-3">
        <Select
          defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => handleFilters('participantId', value)}
          placeholder="Participant"
        >
          <Option value="All">All</Option>
          {participants.map(
            (participant) =>
              participant?.wallet && (
                <Option value={participant._id}>{participant.name}</Option>
              )
          )}
        </Select>
      </div>
    </Flex>
  );

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {filters()}
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={list}
            rowKey="id"
            loading={isLoading}
          />
        </div>
      </Card>
    </>
  );
};

export default WalletList;
