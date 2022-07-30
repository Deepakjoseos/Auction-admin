import React, { useEffect } from "react";
import { Select } from "antd";
import lotteryTypeService from "services/lotteryType";
import lotteryGroupService from "services/lottery-group";

const { Option } = Select;
const LotteryGroupFilter = ({
  setLotteryGroups,
  setLotteryGroupId,
  lotteryGroups,
  handleLotteryGroupChange,
}) => {
  const getLotteries = async () => {
    const data = await lotteryGroupService.getLotteryGroups();
    if (data) {
      setLotteryGroups(data);
    }
  };
  useEffect(() => {
    getLotteries();
  }, []);
  return (
    <Select
      className="w-100"
      style={{ minWidth: 180 }}
      onChange={(value) => setLotteryGroupId(value)}
      onSelect={handleLotteryGroupChange}
      placeholder="Group"
    >
      <Option key="all" value={null}>
        All
      </Option>
      {lotteryGroups?.map((group) => (
        <Option key={group?.id} value={group?.id}>
          {group?.group}
        </Option>
      ))}
    </Select>
  );
};

export default LotteryGroupFilter;
