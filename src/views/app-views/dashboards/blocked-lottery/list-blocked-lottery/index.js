import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Button, Menu, Option } from "antd";
// import BrandListData from 'assets/data/product-list.data.json'
import { SearchOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import blockedLotteryService from "services/blockedLottery";
import lotteryService from "services/lottery";

import lotteryTypeService from "services/lotteryType";

const BlockeLotteryList = () => {
  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);

  const [lotteries, setLotteries] = useState([]);
  const [lotteryTypes, setLotteryTypes] = useState([]);
  const [selectedLotteryId, setselectedLotteryId] = useState(null);
  // const [selectedLotteryNumber, setselectedLotteryNumber] = useState(null);

  const [selectedLotteryType, setselectedLotteryType] = useState(null);
  const { Option } = Select;

  useEffect(() => {
    // Getting Lotteries List to display in the table
    const getLottoryTypes = async () => {
      const data = await blockedLotteryService.getBlockedLotteries();
      if (data) {
        setList(data);
        setSearchBackupList(data);
      }
    };

    const getLotteries = async () => {
      const data = await lotteryService.getLotteries();
      if (data) {
        setLotteries(data);
      }
    };
    const getLotteryTypes = async () => {
      const data = await lotteryTypeService.getLotteryTypes();
      if (data) {
        setLotteryTypes(data);
      }
    };

    getLotteries();
    getLotteryTypes();

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

  const handleQuery = async () => {
    const query = {};
    //  if(selectedLotteryNumber) query.lotteryNumber=selectedLotteryNumber;
    if (selectedLotteryId) query.lotteryId = selectedLotteryId;
    if (selectedLotteryType) query.lotteryTypeId = selectedLotteryType;
    const data = await blockedLotteryService.getBlockedLotteries(query);
    if (data) {
      setList(data);
      setSearchBackupList(data);
    }
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
      {/* <div className="mr-md-3 mb-3">
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setselectedLotteryNumber(value)}
          onSelect={handleQuery}
          placeholder="Lottery Number"
        >
   
          {lotteries.map((lottery) => (
            <Option key={lottery.id} value={lottery.number}>
              {lottery.number}
            </Option>
          ))}
        </Select>
      </div> */}
      <div className="mr-md-3 mb-3">
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setselectedLotteryId(value)}
          onSelect={handleQuery}
          placeholder="Lottery Name"
        >
          {lotteries.map((lottery) => (
            <Option key={lottery.id} value={lottery.id}>
              {lottery.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mr-md-3 mb-3">
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setselectedLotteryType(value)}
          onSelect={handleQuery}
          placeholder="Lottery Type"
        >
          {lotteryTypes.map((type) => (
            <Option key={type.id} value={type.id}>
              {type.name}
            </Option>
          ))}
        </Select>
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
