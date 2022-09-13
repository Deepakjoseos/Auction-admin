import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Tag, Menu, Button } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import stateService from "services/state";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import cityService from "services/city";

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

const CityList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  useEffect(() => {
    // Getting Lotteries List to display in the table
    const getStates = async () => {
      const data = await cityService.getCities();
      console.log(data);
      if (data) {
        setList(data);
        setSearchBackupList(data);
        console.log(data, "show-data");
      }
    };

    getStates();
  }, []);

  // Dropdown menu for each row
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const addState = () => {
    history.push(`/app/dashboards/city/add-city`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/city/edit-city/${row._id}`);
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "State",
      dataIndex: "state",
      render: (state) => state?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
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

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  //  Table Filters JSX Elements
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
          <div>
            {window.localStorage.getItem("auth_type") === "SubAdmin" ? (
              <>
                {currentSubAdminRole?.add && (
                  <Button
                    onClick={addState}
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    block
                  >
                    Add City
                  </Button>
                )}
              </>
            ) : (
              <Button
                onClick={addState}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                Add City
              </Button>
            )}
          </div>
        </Flex>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={list} rowKey="id" />
        </div>
      </Card>
    </>
  );
};

export default CityList;
