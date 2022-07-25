import React, { useEffect, useState } from "react";
import { Card, Table, Input, DatePicker, Button, Select } from "antd";
// import BrandListData from 'assets/data/product-list.data.json'
import { SearchOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import accountService from "services/account";
import agentService from "services/agent";

const { Option } = Select;
const AccountList = () => {
  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [endTimestamp, setEndTimestamp] = useState(null);
  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState(null);

  useEffect(() => {
    const getAgents = async () => {
      const data = await agentService.getAgents();
      if (data) {
        setAgents(data);
      }
    };
    getAgents();
  }, []);

  // Antd Table Columns
  const tableColumns = [
    {
      title: "Agent",
      dataIndex: "agent",
      render: (agent) => <Flex alignItems="center">{agent?.name}</Flex>,
      sorter: (a, b) => a.agent.name.localeCompare(b.agent.name),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => utils.antdTableSorter(a, b, "date"),
    },
    {
      title: "Sales",
      dataIndex: "sales",
      sorter: (a, b) => a.sales - b.sales,
    },
    {
      title: "Winnings",
      dataIndex: "winnings",
      sorter: (a, b) => a.winnings - b.winnings,
    },
    {
      title: "Sub-Agent Commissions",
      dataIndex: "subAgentsCommissions",
      sorter: (a, b) => a.subAgentsCommissions - b.subAgentsCommissions,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      sorter: (a, b) => a.balance - b.balance,
    },
  ];

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  const timeChangeHandle = async () => {
    if (!startTimestamp || !endTimestamp) return;
    const query = {};
    const startDate = new Date(startTimestamp).getTime();
    const endDate = new Date(endTimestamp).getTime();
    query.startTimestamp = startDate;
    query.endTimestamp = endDate;
    if (agentId && agentId !== "All") query.agentId = agentId;
    const data = await accountService.getAccounts(query);
    if (data) {
      setList(data.summaries);
      setSearchBackupList(data.summaries);
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
        <DatePicker
          format={"YYYY-MM-DD"}
          placeholder="From"
          onChange={(value) => setStartTimestamp(value?.utc()?._d)}
        />
      </div>
      <div className="mr-md-3 mb-3">
        <DatePicker
          format={"YYYY-MM-DD"}
          placeholder="Till"
          disabled={!startTimestamp}
          onChange={(value) => setEndTimestamp(value?.utc()?._d)}
        />
      </div>
      <div className="mr-md-3 mb-3">
        <div className="mb-3">
          <Select
            className="w-100"
            style={{ minWidth: 180 }}
            onChange={(value) => setAgentId(value)}
            placeholder="Select Agent"
            disabled={!endTimestamp}
          >
            <Option value="All">All</Option>
            {agents &&
              agents?.length > 0 &&
              agents.map((agent) => (
                <Option key={agent.id} value={agent.id}>
                  {agent.name}
                </Option>
              ))}
          </Select>
        </div>
      </div>
      <div className="mr-md-3 mb-3">
        <Button
          onClick={timeChangeHandle}
          type="primary"
          disabled={!startTimestamp || !endTimestamp}
        >
          Get
        </Button>
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

export default AccountList;
