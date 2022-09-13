import React from "react";
import BuyingLimitForm from "./update-buying-limit";
const UpdateBuyingLimit = (props) => {
  return <BuyingLimitForm param={props.match.params} />;
};

export default UpdateBuyingLimit;
