import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Button, Menu, Tag } from "antd";
// import InformationListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import auctionService from "services/auction";
import { useSelector } from "react-redux";

const { Option } = Select;

const getStockStatus = (status) => {
  if (status === "Active") {
    return (
      <>
        <Tag color="green">Active</Tag>
      </>
    );
  }
  if (status === "Hold") {
    return (
      <>
        <Tag color="red">Hold</Tag>
      </>
    );
  }
  return null;
};
const GroupList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getGroups = async () => {
      const data = await auctionService.getauctions();
      if (data) {
        setList(data);
        console.log(data);
        setSearchBackupList(data);
        console.log(data, "show-data");
      }
    };
    getGroups();
  }, []);

  const dropdownMenu = (row) => {
    if (window.localStorage.getItem("auth_type") === "Admin") {
      return (
        <Menu>
          <Menu.Item onClick={() => viewDetails(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">View Details</span>
            </Flex>
          </Menu.Item>
        </Menu>
      );
    } else {
      if (currentSubAdminRole?.edit) {
        return (
          <Menu>
            <Menu.Item onClick={() => viewDetails(row)}>
              <Flex alignItems="center">
                <EyeOutlined />
                <span className="ml-2">View Details</span>
              </Flex>
            </Menu.Item>
          </Menu>
        );
      }
    }
  };

  const addGroup = () => {
    history.push(`/app/dashboards/auction/add-auction`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/auction/edit-auction/${row._id}`);
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Business",
      dataIndex: "businessType",
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },
    {
      title: "Bid Limit",
      dataIndex: "bidLimit",
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },
    {
      title: "Business",
      dataIndex: "businessType",
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },
    {
      title: "Start Time",
      dataIndex: "startTimestamp",
      render: (status) => {
        var d = new Date(Number(status)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },
    {
      title: "End Time",
      dataIndex: "endTimestamp",
      render: (status) => {
        var d = new Date(Number(status)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "status"),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          {window.localStorage.getItem("auth_type") === "Admin" ? (
            <EllipsisDropdown menu={dropdownMenu(elm)} />
          ) : (
            currentSubAdminRole?.edit && (
              <EllipsisDropdown menu={dropdownMenu(elm)} />
            )
          )}
        </div>
      ),
    },
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  const handleShowStatus = (value) => {
    if (value !== "All") {
      const key = "status";
      const data = utils.filterArray(searchBackupList, key, value);
      setList(data);
    } else {
      setList(searchBackupList);
    }
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
      <div className="mb-3">
        <Select
          defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={handleShowStatus}
          placeholder="Status"
        >
          <Option value="All">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Hold">Hold</Option>
        </Select>
      </div>
    </Flex>
  );

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
        <div>
          {window.localStorage.getItem("auth_type") === "SubAdmin" ? (
            <>
              {currentSubAdminRole?.add && (
                <Button
                  onClick={addGroup}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add Auction
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={addGroup}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Auction
            </Button>
          )}
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default GroupList;
