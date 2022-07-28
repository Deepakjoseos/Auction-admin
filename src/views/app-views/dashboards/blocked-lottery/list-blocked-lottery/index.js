import React, { useEffect, useState } from "react";
import { Card, Table, Input } from "antd";
// import BrandListData from 'assets/data/product-list.data.json'
import { SearchOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import blockedLotteryService from "services/blockedLottery";

const BlockeLotteryList = () => {
  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);

  useEffect(() => {
    // Getting Lotteries List to display in the table
    const getLottoryTypes = async () => {
      const data = await blockedLotteryService.getBlockedLotteries();
      if (data) {
        setList(data);
        setSearchBackupList(data);
      }
    };
    getLottoryTypes();
  }, []);

  // Antd Table Columns
  const tableColumns = [
    {
      title: "Lottery Number",
      dataIndex: "number",
      sorter: (a, b) => utils.antdTableSorter(a, b, "number"),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => utils.antdTableSorter(a, b, "date"),
    },
    {
      title: "Lottery",
      dataIndex: "lottery",
      render: (lottery) => <Flex alignItems="center">{lottery?.name}</Flex>,
      sorter: (a, b) => a.lottery.name.localeCompare(b.lottery.name),
    },
    {
      title: "Type",
      dataIndex: "lotteryType",
      render: (lotteryType) => (
        <Flex alignItems="center">{lotteryType?.name}</Flex>
      ),
      sorter: (a, b) => a.lotteryType.name.localeCompare(b.lotteryType.name),
    },
  ];

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
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

export default BlockeLotteryList;
