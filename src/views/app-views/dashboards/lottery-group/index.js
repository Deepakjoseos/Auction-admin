import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LotteryGroupList from "./lottery-group-list";
import AddLotteryGroup from "./add-lottery-group";
// import AddLottery from './add-lottery'

import EditLotteryGroup from "./edit-lottery-group";

// import Orders from './orders'

// In here we will define all our routes
const LotteryGroup = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/lottery-group-list`}
      />
      <Route
        path={`${match.url}/add-lottery-group`}
        component={AddLotteryGroup}
      />
      <Route
        path={`${match.url}/edit-lottery-group/:id`}
        component={EditLotteryGroup}
      />
      <Route
        path={`${match.url}/lottery-group-list`}
        component={LotteryGroupList}
      />
    </Switch>
  );
};

export default LotteryGroup;
