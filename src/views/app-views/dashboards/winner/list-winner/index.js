import React, { useEffect, useState } from "react";
import { Card, Table, Input, Select, DatePicker } from "antd";
// import BrandListData from 'assets/data/product-list.data.json'
import { SearchOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import winnerService from "services/winner";
import lotteryTypeService from "services/lotteryType";
import LotteryFilter from "components/filter-components/lottery-filter";
import LotteryTypeFilter from "components/filter-components/lottery-type-filter";
import { timestampToDate } from "helpers/dateFunctions";

const WinnerList = () => {
  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [lotteries, setLotteries] = useState([]);
  const [lotteryTypes, setLotteryTypes] = useState([]);
  const [lotteryId, setLotteryId] = useState(null);
  const [lotteryTypeId, setLotteryTypeId] = useState(null);
  const [date, setDate] = useState(null);

  const getWinners = async (query) => {
    const data = await winnerService.getWinners(query);
    if (data) {
      setList(data);
      setSearchBackupList(data);
    }
  };
  useEffect(() => {
    getWinners();
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

  const handleLotteryTypeChange = async (value) => {
    setLotteryTypeId(value);
    const query = { lotteryId, lotteryTypeId: value, date };
    const data = await winnerService.getWinners(query);
    if (data) {
      setList(data);
      setSearchBackupList(data);
    }
  };

  const handleLotteryChange = async (value) => {
    setLotteryId(value);
    const query = { lotteryId: value, lotteryTypeId, date };
    await getWinners(query);

    const lotteryTypes = await lotteryTypeService.getLotteryTypes({
      lotteryId: value,
    });
    setLotteryTypes(lotteryTypes);
  };

  const handleDateChange = async (value) => {
    if (value) {
      const dateString = timestampToDate(new Date(value?.utc()?._d).getTime());
      setDate(dateString);
      await getWinners({ date: dateString });
    } else setDate(null);
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
        <DatePicker
          format={"YYYY-MM-DD"}
          placeholder="Date"
          onChange={handleDateChange}
        />
      </div>
      <div className="mr-md-3 mb-3">
        <div className="mb-3">
          <LotteryFilter
            handleLotteryChange={handleLotteryChange}
            lotteries={lotteries}
            setLotteries={setLotteries}
            setLotteryId={setLotteryId}
          />
        </div>
      </div>
      <div className="mr-md-3 mb-3">
        <div className="mb-3">
          <LotteryTypeFilter
            setLotteryTypeId={setLotteryTypeId}
            setLotteryTypes={setLotteryTypes}
            lotteryTypes={lotteryTypes}
            handleLotteryTypeChange={handleLotteryTypeChange}
          />
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
