import React, { useEffect } from "react";
import { Select } from "antd";
import lotteryTypeService from "services/lotteryType";

const { Option } = Select;
const LotteryTypeFilter = ({
  setLotteryTypes,
  setLotteryTypeId,
  lotteryTypes,
  handleLotteryTypeChange,
}) => {
  const getLotteries = async () => {
    const data = await lotteryTypeService.getLotteryTypes();
    if (data) {
      setLotteryTypes(data);
    }
  };
  useEffect(() => {
    getLotteries();
  }, []);
  return (
    <Select
      className="w-100"
      style={{ minWidth: 180 }}
      onChange={(value) => setLotteryTypeId(value)}
      onSelect={handleLotteryTypeChange}
      placeholder="Type"
    >
      <Option key="all" value={null}>
        All
      </Option>
      {lotteryTypes.map((type) => (
        <Option key={type.id} value={type.id}>
          {type.lottery.name} - {type.name}
        </Option>
      ))}
    </Select>
  );
};

export default LotteryTypeFilter;
