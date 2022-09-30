import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Menu } from "antd";
import {
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import { useSelector } from "react-redux";
import auctionInventoryService from "services/auctionInventory";

const AuctionInventoryList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getGroups = async () => {
      const data = await auctionInventoryService.getInventories();
      if (data) {
        setList(data);
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
    history.push(`/app/dashboards/auction/auction-inventory/add-auction-inventory`);
  };

  const viewDetails = (row) => {
    // auction-inventory/edit-auction-inventory/6321b3d6e2dbb9f6ae8dfd1f
    history.push(
      `/app/dashboards/auction/auction-inventory/edit-auction-inventory/${row._id}`
    );
  };

  const tableColumns = [
    {
      title: "Auction Name",
      dataIndex: "auction",
      render: (auction) => <Flex alignItems="center">{auction.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Chasis Number",
      dataIndex: "chasisNumber",
      sorter: (a, b) => utils.antdTableSorter(a, b, "chasisNumber"),
    },
    {
      title: "Bid Limit",
      dataIndex: "bidLimit",
      sorter: (a, b) => utils.antdTableSorter(a, b, "bidLimit"),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      sorter: (a, b) => utils.antdTableSorter(a, b, "startDate"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      sorter: (a, b) => utils.antdTableSorter(a, b, "endDate"),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      render: (createdBy) => <Flex alignItems="center">{createdBy.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      render: (updatedBy) => <Flex alignItems="center">{updatedBy.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
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
                  Add Auction Inventory
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
              Add Auction Inventory
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

export default AuctionInventoryList;
