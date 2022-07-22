import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AddLotteryType from "./add-lottery-type";
import EditLotteryType from "./edit-lottery-type";
import LotteryTypeList from "./list-lottery-type";

// In here we will define all our routes
const LotteryGroup = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add`} component={AddLotteryType} />
      <Route path={`${match.url}/edit/:id`} component={EditLotteryType} />
      <Route path={`${match.url}/list`} component={LotteryTypeList} />
    </Switch>
  );
};

export default LotteryGroup;
