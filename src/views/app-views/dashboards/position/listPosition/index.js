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
import LotteryFilter from "components/filter-components/lottery-filter";
import LotteryTypeFilter from "components/filter-components/lottery-type-filter";

const { Option } = Select;

const PositionList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [lotteries, setLotteries] = useState([]);
  const [lotteryTypes, setLotteryTypes] = useState([]);
  const [lotteryId, setLotteryId] = useState(null);
  const [lotteryTypeId, setLotteryTypeId] = useState(null);

  // Getting Lotteries List to display in the table
  const getPositions = async (query) => {
    const data = await positionService.getPositions(query);
    if (data) {
      setList(data);
      setSearchBackupList(data);
    }
  };

  useEffect(() => {
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
    // getLotteries();
    // getLotteryTypes();
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

  const handleLotteryChange = async (value) => {
    const query = {};
    query.lotteryId = value;
    query.lotteryTypeId = lotteryTypeId;
    await getPositions(query);
    const data = await lotteryTypeService.getLotteryTypes({
      lotteryId: value,
    });
    if (data) {
      setLotteryTypes(data);
    }
  };

  const handleLotteryTypeChange = async (value) => {
    const query = {};
    query.lotteryId = lotteryId;
    query.lotteryTypeId = value;
    await getPositions(query);
  };

  // const handleClearFilter = async () => {
  //   setselectedLottery(null)
  //   setselectedLotteryType(null)

  //   const data = await positionService.getPositions({})
  //   if (data) {
  //     setList(data)
  //     setSearchBackupList(data)
  //   }
  // }

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
        <LotteryFilter
          setLotteries={setLotteries}
          setLotteryId={setLotteryId}
          lotteries={lotteries}
          handleLotteryChange={handleLotteryChange}
        />
      </div>
      <div className="mr-md-3 mb-3">
        <LotteryTypeFilter
          setLotteryTypes={setLotteryTypes}
          setLotteryTypeId={setLotteryTypeId}
          lotteryTypes={lotteryTypes}
          handleLotteryTypeChange={handleLotteryTypeChange}
        />
      </div>
    </Flex>
  );

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
       
      </Flex>
      <div>
          <Button
            onClick={addLotteryType}
            type="primary"
            icon={<PlusCircleOutlined />}
            
          >
            Add Position
          </Button>
        </div>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default PositionList;
