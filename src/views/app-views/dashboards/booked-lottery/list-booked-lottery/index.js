import React, { useEffect, useState } from "react";
import { Card, Table, Input, Menu } from "antd";
// import BrandListData from 'assets/data/product-list.data.json'
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import bookedLotteryService from "services/bookedLottery";

const BookedLotteryList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);

  useEffect(() => {
    // Getting Lotteries List to display in the table
    const getLottoryTypes = async () => {
      const data = await bookedLotteryService.getBookedLotteries();
      if (data) {
        setList(data);
        setSearchBackupList(data);
      }
    };
    getLottoryTypes();
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
  );

  const viewDetails = (row) => {
    history.push(`/app/dashboards/booking/${row.id}`);
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: "Booking",
      dataIndex: "booking",
      render: (booking) => (
        <Flex alignItems="center">{booking?.bookingNumber}</Flex>
      ),
      sorter: (a, b) =>
        a.booking.bookingNumber.localeCompare(b.booking.bookingNumber),
    },
    {
      title: "Number",
      dataIndex: "lotteryNumber",
      sorter: (a, b) => utils.antdTableSorter(a, b, "bookingNumber"),
    },
    {
      title: "Count",
      dataIndex: "count",
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Date",
      dataIndex: "drawDate",
      sorter: (a, b) => utils.antdTableSorter(a, b, "drawDate"),
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      sorter: (a, b) => a.paidAmount - b.paidAmount,
    },
    {
      title: "Agent",
      dataIndex: "booking",
      render: (booking) => (
        <Flex alignItems="center">{booking?.agent?.name}</Flex>
      ),
      sorter: (a, b) => a.agent.name.localeCompare(b.booking.agent.name),
    },
    {
      title: "Lottery",
      dataIndex: "lottery",
      render: (lottery) => <Flex alignItems="center">{lottery?.name}</Flex>,
      sorter: (a, b) => a.lottery.name.localeCompare(b.lottery.name),
    },
    {
      title: "Group",
      dataIndex: "lotteryGroup",
      render: (lotteryGroup) => (
        <Flex alignItems="center">{lotteryGroup?.group}</Flex>
      ),
      sorter: (a, b) => a.lotteryGroup?.group - b.lotteryGroup?.group,
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

export default BookedLotteryList;
