import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import utils from 'utils';
import buyinglLimitService from 'services/buyingLimit';
import useQueryFilters from 'hooks/useQueryFilters';
import participantService from 'services/Participant';

const { Option } = Select;

const BuyingLimitList = () => {
  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [participants, setParticipants] = useState([]);
  //   const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});

  const { handleFilters, isLoading, setIsLoading, searchParams } =
    useQueryFilters();

  useEffect(() => {
    getBuyingLimits(searchParams);
  }, [searchParams]);

  useEffect(() => {
    getParticipants();
  }, []);

  const getParticipants = async () => {
    const data = await participantService.getAllParticipants();
    setParticipants(data);
  };

  const getBuyingLimits = async (query) => {
    setIsLoading(true);
    const data = await buyinglLimitService.getAll(new URLSearchParams(query));
    console.log(data);
    if (data) {
      setList(data);
      setSearchBackupList(data);
      console.log(data, 'show-data');
    }
    setIsLoading(false);
  };

  const tableColumns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount
    },
    {
      title: 'Participant',
      dataIndex: 'participant',
      render: (participant) => participant?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Done By',
      dataIndex: 'doneBy',
      render: (doneBy) => doneBy?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'remark')
    },
    {
      title: 'Date',
      dataIndex: 'timestamp',
      render: (date) => {
        var d = new Date(Number(date)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'timestamp')
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
          {participants.map((participant) => (
            <Option value={participant._id}>{participant.name}</Option>
          ))}
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

export default BuyingLimitList;
