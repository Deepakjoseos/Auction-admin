import React, { useEffect } from "react";
import { Select } from "antd";
import lotteryService from "services/lottery";

const { Option } = Select;
const LotteryFilter = ({
  setLotteries,
  setLotteryId,
  lotteries,
  handleLotteryChange,
}) => {
  const getLotteries = async () => {
    const data = await lotteryService.getLotteries();
    if (data && setLotteries) {
      setLotteries(data);
    }
  };

  useEffect(() => {
    getLotteries();
  }, []);
  return (
    <Select
      className="w-100"
      style={{ minWidth: 180 }}
      onChange={(value) => setLotteryId(value)}
      onSelect={handleLotteryChange}
      placeholder="Lottery"
    >
      <Option key="all" value={null}>
        All
      </Option>
      {lotteries?.map((lottery) => (
        <Option key={lottery.id} value={lottery.id}>
          {lottery.name}
        </Option>
      ))}
    </Select>
  );
};

export default LotteryFilter;
