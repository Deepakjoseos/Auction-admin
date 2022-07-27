import React, { useEffect, useState } from "react";
import { Card, Table, Input, Select } from "antd";
// import BrandListData from 'assets/data/product-list.data.json'
import { SearchOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import lotteryService from "services/lottery";
import winnerService from "services/winner";
import lotteryTypeService from "services/lotteryType";

const { Option } = Select;
const WinnerList = () => {
  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [lotteries, setLotteries] = useState([]);
  const [lotteryTypes, setLotteryTypes] = useState([]);
  const [lotteryId, setLotteryId] = useState(null);
  const [lotteryTypeId, setLotteryTypeId] = useState(null);

  useEffect(() => {
    const getAllWinners = async () => {
      const data = await winnerService.getWinners();
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
    getAllWinners();
    getLotteries();
  }, []);

  // Antd Table Columns
  const tableColumns = [
    {
      title: "Rank",
      dataIndex: "position",
      render: (position) => <Flex alignItems="center">{position?.rank}</Flex>,
      sorter: (a, b) => a.position.rank - b.position.rank,
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
    {
      title: "Number",
      dataIndex: "number",
      sorter: (a, b) => utils.antdTableSorter(a, b, "number"),
    },
    {
      title: "Prize",
      dataIndex: "position",
      render: (position) => <Flex alignItems="center">{position?.amount}</Flex>,
      sorter: (a, b) => a.position.amount - b.position.amount,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => utils.antdTableSorter(a, b, "date"),
    },
  ];

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  const findByLottery = async (value) => {
    setLotteryId(value);
    const query = { lotteryId: value };
    const data = await winnerService.getWinners(query);
    if (data) {
      setList(data);
      setSearchBackupList(data);
    }

    const allLotteryTypes = await lotteryTypeService.getLotteryTypes();
    const getLotteryTypes = allLotteryTypes.filter(
      (type) => type.lottery.id === value
    );
    if (getLotteryTypes) setLotteryTypes(getLotteryTypes);
  };

  const findByLotteryType = async (value) => {
    setLotteryTypeId(value);
    const query = { lotteryId, lotteryTypeId: value };
    const data = await winnerService.getWinners(query);
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
      <div className="mr-md-3 mb-3">
        <div className="mb-3">
          <Select
            className="w-100"
            style={{ minWidth: 180 }}
            onChange={findByLottery}
            placeholder="Lottery"
          >
            {lotteries &&
              lotteries?.length > 0 &&
              lotteries.map((lottery) => (
                <Option key={lottery.id} value={lottery.id}>
                  {lottery.name}
                </Option>
              ))}
          </Select>
        </div>
      </div>
      <div className="mr-md-3 mb-3">
        <div className="mb-3">
          <Select
            className="w-100"
            style={{ minWidth: 180 }}
            onChange={findByLotteryType}
            placeholder="Lottery Type"
            disabled={!lotteryId}
          >
            {lotteryTypes &&
              lotteryTypes?.length > 0 &&
              lotteryTypes.map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))}
          </Select>
        </div>
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

export default WinnerList;
