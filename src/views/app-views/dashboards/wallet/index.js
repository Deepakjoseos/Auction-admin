import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UpdateBuyingLimit from "./buying-limit";
import WalletList from "./list-wallet";

const Wallet = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/wallet-list`} />
      <Route path={`${match.url}/wallet-list`} component={WalletList} />
      <Route
        path={`${match.url}/update-buying-limit/:id`}
        component={UpdateBuyingLimit}
      />
    </Switch>
  );
};

export default Wallet;
