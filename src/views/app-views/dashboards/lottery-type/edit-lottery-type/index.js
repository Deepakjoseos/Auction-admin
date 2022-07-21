import React from "react";
import LotteryTypeForm from "../form-lottery-type";
const EditLotteryType = ({ match }) => {
  return <LotteryTypeForm mode="EDIT" param={match.params} />;
};

export default EditLotteryType;
