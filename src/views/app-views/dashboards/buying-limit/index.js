import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import BuyingLimitList from "./list-buying-limit";

const Wallet = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={BuyingLimitList} />
    </Switch>
  );
};

export default Wallet;
