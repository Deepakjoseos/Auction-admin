import React, { useEffect, useState } from 'react';
import { Card, Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import utils from 'utils';
import buyinglLimitService from 'services/buyingLimit';

const BuyingLimitList = ({ participantId }) => {
  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  //   const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  useEffect(() => {
    getBuyingLimits();
  }, []);

  const getBuyingLimits = async () => {
    const data = await buyinglLimitService.getAll(
      `participantId=${participantId}`
    );
    if (data) {
      setList(data);
      setSearchBackupList(data);
      console.log(data, 'show-data');
    }
  };

  const tableColumns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount
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
    </Flex>
  );

  return (
    list.length > 0 && (
      <Card title="Buying limit history">
        {/* <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {filters()}
        </Flex> */}
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={list} rowKey="id" />
        </div>
      </Card>
    )
  );
};

export default BuyingLimitList;
