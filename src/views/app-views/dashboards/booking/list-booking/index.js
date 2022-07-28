import React, { useEffect, useState } from "react";
import { Card, Table, Input, Menu,Modal } from "antd";
// import BrandListData from 'assets/data/product-list.data.json'
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import bookingService from "services/booking";

const BookingList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingNumber,setBookingNumber] = useState(null)

  useEffect(() => {
    // Getting Lotteries List to display in the table
    const getBookings = async () => {
      const data = await bookingService.getBookings();
      if (data) {
        setList(data);
        setSearchBackupList(data);
      }
    };
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
const viewBookingDetails = (row) =>{
  history.push(`/app/dashboards/booking/booked-lotteries/${row.bookingNumber}`);
}
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
    <>
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
    
    </>
  );
};

export default BookingList;
