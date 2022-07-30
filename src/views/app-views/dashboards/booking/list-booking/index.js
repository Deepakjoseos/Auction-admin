import React, { useEffect, useState } from "react";
import { Card, Table, Input, Menu, DatePicker, Button } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import bookingService from "services/booking";
import { timestampToDate } from "helpers/dateFunctions";
import AgentFilter from "components/filter-components/agent-filter";
import LotteryFilter from "components/filter-components/lottery-filter";

const BookingList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [lotteries, setLotteries] = useState([]);
  const [lotteryId, setLotteryId] = useState(null);
  const [bookingNumber, setBookingNumber] = useState(null);
  const [date, setDate] = useState(null);
  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState(null);

  const getBookings = async (query) => {
    console.log(query);
    const data = await bookingService.getBookings(query);
    if (data) {
      console.log(data);
      setList(data);
      setSearchBackupList(data);
    }
  };
  useEffect(() => {
    getBookings();
  }, []);

  // Dropdown menu for each row
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Booking Commissions</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => viewBookingDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Booking Details</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const viewDetails = (row) => {
    history.push(`/app/dashboards/booking/${row.id}`);
  };

  const viewBookingDetails = (row) => {
    history.push(
      `/app/dashboards/booking/booked-lotteries/${row.bookingNumber}`
    );
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: "Booking",
      dataIndex: "bookingNumber",
      sorter: (a, b) => utils.antdTableSorter(a, b, "bookingNumber"),
    },
    {
      title: "Agent",
      dataIndex: "agent",
      render: (agent) => <Flex alignItems="center">{agent?.name}</Flex>,
      sorter: (a, b) => a.agent.name.localeCompare(b.agent.name),
    },
    {
      title: "Lottery",
      dataIndex: "lottery",
      render: (lottery) => <Flex alignItems="center">{lottery?.name}</Flex>,
      sorter: (a, b) => a.lottery.name.localeCompare(b.lottery.name),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      sorter: (a, b) => utils.antdTableSorter(a, b, "totalAmount"),
    },

    {
      title: "Date",
      dataIndex: "drawDate",
      sorter: (a, b) => utils.antdTableSorter(a, b, "drawDate"),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  const handleQueryChange = async () => {
    const query = {
      lotteryId,
      bookingNumber: bookingNumber?.toString(),
      agentId,
      date,
    };

    await getBookings(query);
  };

  const handleDateChange = (value) => {
    if (value) {
      const dateString = timestampToDate(new Date(value?.utc()?._d).getTime());
      setDate(dateString);
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
        <Input
          placeholder="Booking Number"
          onChange={(e) => setBookingNumber(e.target.value)}
          value={bookingNumber}
          type="number"
          min={1}
          pattern="[0-9]"
        />
      </div>

      <div className="mr-md-3 mb-3">
        <LotteryFilter
          setLotteries={setLotteries}
          setLotteryId={setLotteryId}
          lotteries={lotteries}
          // handleLotteryChange={handleLotteryChange}
        />
      </div>
      <div className="mr-md-3 mb-3">
        <AgentFilter
          setAgents={setAgents}
          setAgentId={setAgentId}
          agents={agents}
          handleAgentChange={(value) => setAgentId(value)}
        />
      </div>
      <div className="mr-md-3 mb-3">
        <Button onClick={handleQueryChange} type="primary">
          Get
        </Button>
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

export default BookingList;
