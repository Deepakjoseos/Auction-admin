import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import WalletTransactionList from "./list-transactions";

const WalletTransaction = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/wallet-transaction-list`}
      />
      <Route
        path={`${match.url}/wallet-transaction-list`}
        component={WalletTransactionList}
      />
    </Switch>
  );
};

export default WalletTransaction;
