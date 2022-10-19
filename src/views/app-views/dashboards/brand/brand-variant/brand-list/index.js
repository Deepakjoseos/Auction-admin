import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Button, Menu, Tag } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import { useSelector } from "react-redux";
import brandVariantService from "services/brandVariant.service";

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
const BrandVariantList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const brandRole = user.roles.find((role) => role.module === "BRAND");
      console.log("brandRole", brandRole);
      setCurrentSubAdminRole(brandRole);
    }
  }, [user]);
  console.log(user, "jhbjkbuser");

  useEffect(() => {
    getBrandVariants();
  }, []);

  const getBrandVariants = async () => {
    const data = await brandVariantService.getAll();
    if (data) {
      setList(data);
      setSearchBackupList(data);
      console.log(data, "show-data");
    }
  };

  // Dropdown menu for each row
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
          <Menu.Item onClick={() => deleteRow(row)}>
            <Flex alignItems="center">
              <DeleteOutlined />
              <span className="ml-2">Delete</span>
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

  const addProduct = () => {
    history.push(`/app/dashboards/brand/brand-variant/add`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/brand/brand-variant/edit/${row._id}`);
  };

  const deleteRow = async (row) => {
    console.log(row);
    const resp = await brandVariantService.delete(row._id);
    if (resp) {
      getBrandVariants()
    }
     

    // if (resp) {
    //   const objKey = "id";
    //   let data = list;
    //   if (selectedRows.length > 1) {
    //     selectedRows.forEach((elm) => {
    //       data = utils.deleteArrayRow(data, objKey, elm.id);
    //       setList(data);
    //     });
    //   } else {
    //     data = utils.deleteArrayRow(data, objKey, row.id);
    //     setList(data);
    //   }
    // }
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: "Variant",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            size={60}
            type="square"
            src={record.logo}
            name={record.name}
          />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      render: (brand) => <Flex alignItems="center">{brand.name}</Flex>,
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

  // Filter Status Handler
  const handleShowStatus = (value) => {
    if (value !== "All") {
      const key = "status";
      const data = utils.filterArray(searchBackupList, key, value);
      setList(data);
    } else {
      setList(searchBackupList);
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
                  onClick={addProduct}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add Brand Variant
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={addProduct}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Brand Variant
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

export default BrandVariantList;
