import React, { useEffect, useState } from "react";
import { Card, Table, Input, Select, DatePicker, Button } from "antd";
// import BrandListData from 'assets/data/product-list.data.json'
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import lotteryService from "services/lottery";
import outcomeService from "services/outcome";
import { useHistory } from "react-router-dom";

const { Option } = Select;
const OutcomeList = () => {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [lotteries, setLotteries] = useState([]);
  const [lotteryId, setLotteryId] = useState(null);
  const [timing, setTiming] = useState("Today");
  const [pastDate, setPastDate] = useState(null);

  useEffect(() => {
    const getLotteries = async () => {
      const data = await lotteryService.getLotteries();
      if (data) {
        setLotteries(data);
      }
    };
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
      title: "Number(s)",
      dataIndex: "numbers",
      render: (numbers) => (
        <Flex alignItems="center">
          <p style={{ maxWidth: "200px" }}>{numbers?.join(", ")} </p>
        </Flex>
      ),
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
      title: "Prize",
      dataIndex: "position",
      render: (position) => <Flex alignItems="center">{position?.amount}</Flex>,
      sorter: (a, b) => a.position.amount - b.position.amount,
    },
    {
      title: "Agent Reward",
      dataIndex: "position",
      render: (position) => (
        <Flex alignItems="center">{position?.agentCommission}</Flex>
      ),
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

  const todayOutcomes = async (value) => {
    setLotteryId(value);
    const data = await outcomeService.getOutcomes(value);
    if (data) {
      setList(data);
      setSearchBackupList(data);
    }
  };

  const pastOutcomes = async (value) => {
    if (!pastDate?.day) return;
    setLotteryId(value);
    const data = await outcomeService.getPastOutcomes(value, pastDate);
    if (data) {
      setList(data);
      setSearchBackupList(data);
    }
  };

  const handleDateChange = async (value) => {
    if (!lotteryId) return;
    const info = {
      day: value?.date(),
      month: value?.month() + 1,
      year: value?.year(),
    };
    const data = await outcomeService.getPastOutcomes(lotteryId, info);
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
            onChange={(value) => setTiming(value)}
            placeholder="Time"
            defaultValue="Today"
          >
            <Option value="Today">Today</Option>
            <Option value="Past">Past</Option>
          </Select>
        </div>
      </div>
      <div className="mr-md-3 mb-3">
        <div className="mb-3">
          <Select
            className="w-100"
            style={{ minWidth: 180 }}
            onChange={timing === "Past" ? pastOutcomes : todayOutcomes}
            placeholder="Lottery"
            onSelect={(value) => setLotteryId(value)}
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
        <DatePicker
          format={"YYYY-MM-DD"}
          placeholder="From"
          disabled={timing === "Today"}
          onSelect={handleDateChange}
          onChange={(value) =>
            setPastDate({
              day: value?.date(),
              month: value?.month() + 1,
              year: value?.year(),
            })
          }
        />
      </div>
    </Flex>
  );

  const drawLottery = () => {
    history.push(`/app/dashboards/outcome/draw-lottery`);
  };

  return (
    <Card>
      <Flex justifyContent="between" mobileFlex={false}>
        {filters()}
        <div>
          <Button
            onClick={drawLottery}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Draw Lottery
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default OutcomeList;
