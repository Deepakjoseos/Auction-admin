import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DepositList from "./list-deposit";
import MakeDeposit from "./make-deposit";

const Deposit = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/deposit-list`} />
      <Route path={`${match.url}/make-deposit`} component={MakeDeposit} />
      <Route path={`${match.url}/deposit-list`} component={DepositList} />
    </Switch>
  );
};

export default Deposit;
