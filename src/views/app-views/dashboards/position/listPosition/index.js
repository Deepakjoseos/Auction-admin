import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Button, Menu } from "antd";
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
import positionService from "services/position";
import lotteryService from "services/lottery";
import lotteryTypeService from "services/lotteryType";

const { Option } = Select;

const PositionList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [lotteries, setLotteries] = useState([]);
  const [lotteryTypes, setLotteryTypes] = useState([]);
  const [selectedLottery, setselectedLottery] = useState(null);
  const [selectedLotteryType, setselectedLotteryType] = useState(null);

  useEffect(() => {
    // Getting Lotteries List to display in the table
    const getPositions = async () => {
      const data = await positionService.getPositions();
      if (data) {
        setList(data);
        setSearchBackupList(data);
      }
    };
    const getLotteries = async () => {
      const data = await lotteryService.getLotteries();
      if (data) {
        setLotteries(data);
      }
    };
    const getLotteryTypes = async () => {
      const data = await lotteryTypeService.getLotteryTypes();
      if (data) {
        setLotteryTypes(data);
      }
    };
    getPositions();
    getLotteries();
    getLotteryTypes();
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

  const addLotteryType = () => {
    history.push(`/app/dashboards/position/add`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/position/edit/${row.id}`);
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: "Rank",
      dataIndex: "rank",
      sorter: (a, b) => utils.antdTableSorter(a, b, "rank"),
    },
    {
      title: "Lottery",
      dataIndex: "lottery",
      render: (lottery) => <Flex alignItems="center">{lottery?.name}</Flex>,
      sorter: (a, b) => a.lottery.name.localeCompare(b.lottery.name),
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
      title: "Prize",
      dataIndex: "amount",
      sorter: (a, b) => utils.antdTableSorter(a, b, "amount"),
    },
    {
      title: "Agent Reward",
      dataIndex: "agentCommission",
      sorter: (a, b) => utils.antdTableSorter(a, b, "agentCommission"),
    },
    {
      title: "Count",
      dataIndex: "count",
      sorter: (a, b) => utils.antdTableSorter(a, b, "count"),
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

  const handleQuery = async () => {
    const query = {};

    if (selectedLottery) query.lotteryId = selectedLottery;
    if (selectedLotteryType) query.lotteryTypeId = selectedLotteryType;
    const data = await positionService.getPositions(query);
    if (data) {
      setList(data);
      setSearchBackupList(data);
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

      <div className="mr-md-3 mb-3">
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setselectedLottery(value)}
          onSelect={handleQuery}
          placeholder="Lottery"
        >
   
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
          onChange={(value) => setselectedLotteryType(value)}
          onSelect={handleQuery}
          placeholder="Type"
        >
     
          {lotteryTypes.map((type) => (
            <Option key={type.id} value={type.id}>
              {type.name}
            </Option>
          ))}
        </Select>
      </div>
    </Flex>
  );

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
        <div>
          <Button
            onClick={addLotteryType}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Position
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default PositionList;
