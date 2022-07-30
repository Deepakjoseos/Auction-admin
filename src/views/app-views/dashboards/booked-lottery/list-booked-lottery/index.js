import React, { useEffect, useState } from "react";
import { Card, Table, Input, Menu, Button, DatePicker } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import bookedLotteryService from "services/bookedLottery";
import lotteryTypeService from "services/lotteryType";
import LotteryFilter from "components/filter-components/lottery-filter";
import LotteryTypeFilter from "components/filter-components/lottery-type-filter";
import LotteryGroupFilter from "components/filter-components/lottery-group-filter";
import { timestampToDate } from "helpers/dateFunctions";
import AgentFilter from "components/filter-components/agent-filter";


const BookedLotteryList = () => {
  let history = useHistory()

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [lotteries, setLotteries] = useState([]);
  const [lotteryTypes, setLotteryTypes] = useState([]);
  const [lotteryId, setLotteryId] = useState(null);
  const [lotteryTypeId, setLotteryTypeId] = useState(null);
  const [lotteryNumber, setLotteryNumber] = useState(null);
  const [bookingNumber, setBookingNumber] = useState(null);
  const [drawDate, setDrawDate] = useState(null);
  const [lotteryGroups, setLotteryGroups] = useState([]);
  const [lotteryGroupId, setLotteryGroupId] = useState(null);
  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState(null);

  // Getting Lotteries List to display in the table
  const getBookedLottories = async (query) => {
    const data = await bookedLotteryService.getBookedLotteries(query);
    if (data) {
      setList(data);
      setSearchBackupList(data);
    }
  };

  useEffect(() => {
    getBookedLottories();
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
    </Menu>
  )

  const viewDetails = (row) => {
    history.push(`/app/dashboards/booking/${row.id}`)
  }

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Booking',
      dataIndex: 'booking',
      render: (booking) => (
        <Flex alignItems="center">{booking?.bookingNumber}</Flex>
      ),
      sorter: (a, b) =>
        a.booking.bookingNumber.localeCompare(b.booking.bookingNumber),
    },
    {
      title: 'Number',
      dataIndex: 'lotteryNumber',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'bookingNumber'),
    },
    {
      title: 'Count',
      dataIndex: 'count',
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: 'Date',
      dataIndex: 'drawDate',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'drawDate'),
    },
    {
      title: 'Paid Amount',
      dataIndex: 'paidAmount',
      sorter: (a, b) => a.paidAmount - b.paidAmount,
    },
    {
      title: 'Agent',
      dataIndex: 'booking',
      render: (booking) => (
        <Flex alignItems="center">{booking?.agent?.name}</Flex>
      ),
      sorter: (a, b) => a.agent.name.localeCompare(b.booking.agent.name),
    },
    {
      title: 'Lottery',
      dataIndex: 'lottery',
      render: (lottery) => <Flex alignItems="center">{lottery?.name}</Flex>,
      sorter: (a, b) => a.lottery.name.localeCompare(b.lottery.name),
    },
    {
      title: 'Group',
      dataIndex: 'lotteryGroup',
      render: (lotteryGroup) => (
        <Flex alignItems="center">{lotteryGroup?.group}</Flex>
      ),
      sorter: (a, b) => a.lotteryGroup?.group - b.lotteryGroup?.group,
    },
    {
      title: 'Type',
      dataIndex: 'lotteryType',
      render: (lotteryType) => (
        <Flex alignItems="center">{lotteryType?.name}</Flex>
      ),
      sorter: (a, b) => a.lotteryType.name.localeCompare(b.lotteryType.name),
    },

    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ]

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value
    const searchArray = e.currentTarget.value ? list : searchBackupList
    const data = utils.wildCardSearch(searchArray, value)
    setList(data)
  }

  const handleQueryChange = async () => {
    const query = {
      lotteryId,
      lotteryTypeId,
      bookingNumber: bookingNumber?.toString(),
      lotteryGroupId,
      agentId,
      drawDate,
      lotteryNumber: lotteryNumber?.toString(),
    };

    await getBookedLottories(query);
  };

  const handleLotteryChange = async (value) => {
    const data = await lotteryTypeService.getLotteryTypes({
      lotteryId: value,
      lotteryGroupId,
    });
    setLotteryTypes(data);
  };

  const handleLotteryGroupChange = async (value) => {
    const data = await lotteryTypeService.getLotteryTypes({
      lotteryGroupId: value,
      lotteryId,
    });
    setLotteryTypes(data);
  };

  const handleDateChange = (value) => {
    if (value) {
      const dateString = timestampToDate(new Date(value?.utc()?._d).getTime());
      setDrawDate(dateString);
    } else setDrawDate(null);
  };

  // Table Filters JSX Elements
  const filters = () => (
    <Flex className="mb-1" mobileFlex={false}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="mr-md-3 mb-3">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e)}
          />
        </div>

        <div className="mr-md-3 mb-3">
          <LotteryFilter
            setLotteries={setLotteries}
            setLotteryId={setLotteryId}
            lotteries={lotteries}
            handleLotteryChange={handleLotteryChange}
          />
        </div>
        <div className="mr-md-3 mb-3">
          <LotteryGroupFilter
            setLotteryGroups={setLotteryGroups}
            setLotteryGroupId={setLotteryGroupId}
            lotteryGroups={lotteryGroups}
            handleLotteryGroupChange={handleLotteryGroupChange}
          />
        </div>
        <div className="mr-md-3 mb-3">
          <LotteryTypeFilter
            setLotteryTypes={setLotteryTypes}
            setLotteryTypeId={setLotteryTypeId}
            lotteryTypes={lotteryTypes}
            handleLotteryTypeChange={(value) => setLotteryTypeId(value)}
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
          <Input
            placeholder="Lottery Number"
            onChange={(e) => setLotteryNumber(e.target.value)}
            value={lotteryNumber}
            type="number"
            min={1}
            pattern="[0-9]"
          />
        </div>
        <div className="mr-md-3 mb-3">
          <Button onClick={handleQueryChange} type="primary">
            Get
          </Button>
        </div>
      </div>
    </Flex>
  )

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  )
}

export default BookedLotteryList
