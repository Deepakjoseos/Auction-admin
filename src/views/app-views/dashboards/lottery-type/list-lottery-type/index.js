import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Button, Menu, Tag } from "antd";
// import BrandListData from 'assets/data/product-list.data.json'
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
import lotteryGroupService from "services/lottery-group";
import lotteryTypeService from "services/lotteryType";
import lotteryService from "services/lottery";

const { Option } = Select;

const getStatus = (status) => {
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

  if (status === "Deleted") {
    return (
      <>
        <Tag color="red">Deleted</Tag>
      </>
    );
  }

  return null;
};
const LotteryTypeList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [lotteries, setLotteries] = useState([]);
  const [lotteryId, setLotteryId] = useState();
  const [lotteryGroups, setLotteryGroups] = useState(null);
  const [lotteryGroupId, setLotteryGroupId] = useState(null);

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [lotteries, setLotteries] = useState([])
  const [lotteryId, setLotteryId] = useState([])
  const [lotteryGroups, setLotteryGroups] = useState([])
  const [lotteryGroupId, setLotteryGroupId] = useState(null)

  const [selectedlotteryGroupId, setSelectedLotteryGroupId] = useState(null)
  const [selectedlotteryId, setSelectedLotteryId] = useState(null)

  // Getting Lotteries List to display in the table
  const getLottoryTypes = async (query) => {
    const data = await lotteryTypeService.getLotteryTypes(query);
    if (data) {
      setList(data);
      setSearchBackupList(data);
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await lotteryGroupService.getLotteryGroups();
      if (data) {
        setLotteryGroups(data);
      }
    };
    const getLottories = async () => {
      const data = await lotteryService.getLotteries();
      if (data) {
        setLotteries(data);
        setSearchBackupList(data);
      }
    };
    getLottories();
    getLottoryTypes();
    fetchGroups();
  }, []);

  //Dropdown menu for each row
  const dropdownMenu = (row) => (
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
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : "Delete"}
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const addLotteryType = () => {
    history.push(`/app/dashboards/lottery-type/add`);
  };

  // For deleting a row
  const deleteRow = async (row) => {
    const resp = await lotteryTypeService.deleteLotteryType(row.id);
    if (resp) {
      const objKey = "id";
      let data = list;
      if (selectedRows.length > 1) {
        selectedRows.forEach((elm) => {
          data = utils.deleteArrayRow(data, objKey, elm.id);
          setList(data);
          setSelectedRows([]);
        });
      } else {
        data = utils.deleteArrayRow(data, objKey, row.id);
        setList(data);
      }
    }
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/lottery-type/edit/${row.id}`);
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: "Type",
      dataIndex: "name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Lottery",
      dataIndex: "lottery",
      render: (lottery, row) => {
        return <Flex alignItems="center">{lottery?.name}</Flex>;
      },
      sorter: (a, b) => a.lottery.name.localeCompare(b.lottery.name),
    },
    {
      title: "Group",
      dataIndex: "lotteryGroup",
      key: "lotteryGroup",
      render: (lotteryGroup) => (
        <Flex alignItems="center">{lotteryGroup?.group}</Flex>
      ),
      sorter: (a, b) => a.lotteryGroup?.group - b.lotteryGroup?.group,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => utils.antdTableSorter(a, b, "price"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <Flex alignItems="center">{getStatus(status)}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "status"),
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
    setSelectedRowKeys([]);
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
  const handleLotteryChange = async (value) => {
    const query = {};
    query.lotteryGroupId = lotteryGroupId;
    query.lotteryId = value;
    await getLottoryTypes(query);
  };

  const handleLotteryGroupChange = async (value) => {
    const query = {};
    query.lotteryGroupId = value;
    query.lotteryId = lotteryId;
    await getLottoryTypes(query);
  };


  const handleQuery = async () => {
    const query = {}
    if ((selectedlotteryId || selectedlotteryGroupId) !== 'All')
      query.lottteryId = selectedlotteryId
    query.lotteryGroupId = selectedlotteryGroupId
    console.log('query', query)
    const data = await lotteryTypeService.getLotteryTypes(query)
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
  }

  const handleClearFilter = async () => {
    setSelectedLotteryId(null)
    setSelectedLotteryGroupId(null)

    const data = await lotteryTypeService.getLotteryTypes({})
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
  }

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

      <div className="mr-md-3 mb-3 ">
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

      {/* <div className="mr-md-3 mb-3">
        <Select
          onChange={handleLotteryChange}
          onSelect={(value) => setLotteryId(value)}
          placeholder="Lottery"
          style={{ minWidth: 180 }}
        >
          <Option key="all" value={null}>
            All
          </Option>
          {lotteries.map((lottery) => (
            <Option key={lottery.id} value={lottery.id}>
              {lottery.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mr-md-3 mb-3">
        <Select
          onChange={handleLotteryGroupChange}
          onSelect={(value) => setLotteryGroupId(value)}
          placeholder="Lottery Group"
          style={{ minWidth: 180 }}
        >
          <Option key="all" value={null}>
            All
          </Option>
          {lotteryGroups?.map((group) => (
            <Option key={group.id} value={group.id}>
              {group.group}
            </Option>
          ))}
        </Select>
      </div> */}

      <div className="mr-md-3 mb-3">
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedLotteryId(value)}
          // onSelect={handleQuery}
          placeholder="Lottery"
          value={selectedlotteryId}
        >
          <Option value="">All</Option>
          {lotteries.map((lottery) => (
            <Option key={lottery.id} value={lottery.id}>
              {lottery.name}
            </Option>
          ))}
        </Select>
      </div>

      <div className="mr-md-3 mb-3">
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedLotteryGroupId(value)}
          // onSelect={handleQuery}
          value={selectedlotteryGroupId}
          placeholder="LotteryGroup"
        >
          <Option value="">All</Option>
          {lotteryGroups.map((group) => (
            <Option key={group.id} value={group.id}>
              {group.group}
            </Option>
          ))}
        </Select>
      </div>
      <div >
        <Button type="primary" className="mr-2 " onClick={handleQuery}>
          Filter
        </Button>
      </div>
      <div>
        <Button type="primary" className="mr-2" onClick={handleClearFilter}>
          Clear
        </Button>
      </div>
      <div>
   
          </div>
    </Flex>
  );

  return (
    <Card >
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
    
      </Flex>
      <div>
      <Button  
            onClick={addLotteryType}
            type="primary"
            icon={<PlusCircleOutlined />}
           
          >
            Add LotteryType
          </Button>
          </div>
      <div className="table-responsive ">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default LotteryTypeList;
