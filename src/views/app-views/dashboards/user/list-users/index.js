import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  Modal,
  Form,
  notification,
} from "antd";
// import BrandListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import authAdminService from "services/auth/admin";
import EditRoleSubAdmin from "./EditRoleSubAdmin";

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
const UserList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [agentIdForPassword, setAgentIdForPassword] = useState(null);
  const [agentPassword, setAgentPassword] = useState(null);
  const [isEditRoleFormOpen, setIsEditRoleFormOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const getUsers = async () => {
    const data = await authAdminService.getAllSubAdmins();
    console.log(data)
    if (data) {
      setList(data);
      setSearchBackupList(data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const showModal = (row) => {
    setIsModalVisible(true);
    setAgentIdForPassword(row.id);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setAgentIdForPassword(null);
    setAgentPassword(null);
  };

  // Dropdown menu for each row
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setIsEditRoleFormOpen(true);
          setSelectedUserId(row._id);
        }}
      >
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">Edit Role</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const addLottery = () => {
    history.push(`/app/dashboards/user/add-user`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/user/edit-user/${row._id}`);
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => {
        return <Flex alignItems="center">{name}</Flex>;
      },
      sorter: (a, b) => a.name?.first?.localeCompare(b?.name?.first)
    },

    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'email')
    },

    {
      title: 'Contact',
      dataIndex: 'contact',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'contact')
    },

    {
      title: 'Employee Type',
      dataIndex: 'employeeType',
      render: (employeeType) => <Flex alignItems="center">{employeeType.name}</Flex>
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'employeeType')
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
    },

    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      )
    }
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
  const editAgentPassword = async () => {
    console.log("agentpassword", agentPassword);
    // if (agentPassword?.length > 0) {
    //   const res = await agentService.editPassword(agentIdForPassword, {
    //     password: agentPassword,
    //   });
    //   if (res) {
    //     notification.success({
    //       message: "Edited Password successfully",
    //     });
    //     handleCancel();
    //     setAgentPassword(null);
    //     setAgentIdForPassword(null);
    //   }
    // }
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
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {filters()}
          <div>
            <Button
              onClick={addLottery}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add User
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={list} rowKey="id" />
        </div>
      </Card>
      {/* <Modal
        footer={false}
        title="Edit Password"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form.Item
          label="Password"
          name="password"
          //   onChange={(e)=>setAgentIdForPassword(e.target.value)}
        >
          <Input.Password
            value={agentPassword}
            onChange={(e) => setAgentPassword(e.target.value)}
          />

          <Form.Item className="mt-2" wrapperCol={{ offset: 18, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={editAgentPassword}
            >
              Submit
            </Button>
          </Form.Item>
        </Form.Item>
      </Modal> */}
      <EditRoleSubAdmin
        isFormOpen={isEditRoleFormOpen}
        setIsFormOpen={setIsEditRoleFormOpen}
        userId={selectedUserId}
      />
    </>
  );
};

export default UserList;
