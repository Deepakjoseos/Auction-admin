import React, { useEffect } from "react";
import { Select } from "antd";
import agentService from "services/agent";

const { Option } = Select;
const AgentFilter = ({ setAgents, setAgentId, agents, handleAgentChange }) => {
  const getLotteries = async () => {
    const data = await agentService.getAgents();
    if (data) {
      setAgents(data);
    }
  };

  useEffect(() => {
    getLotteries();
  }, []);

  return (
    <Select
      className="w-100"
      style={{ minWidth: 180 }}
      onChange={(value) => setAgentId(value)}
      onSelect={handleAgentChange}
      placeholder="Agent"
    >
      <Option key="all" value={null}>
        All
      </Option>
      {agents?.map((agent) => (
        <Option key={agent.id} value={agent.id}>
          {agent.name}
        </Option>
      ))}
    </Select>
  );
};

export default AgentFilter;
