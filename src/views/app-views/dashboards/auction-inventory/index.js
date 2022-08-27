import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AddAuction from "./add-auction";
import AuctionList from "./auction-list";

// import Orders from './orders'

const Auction = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/auction-inventory-list`} />
      <Route path={`${match.url}/add-auction-inventory`} component={AddAuction} />
      <Route path={`${match.url}/auction-inventory-list`} component={AuctionList} />

    </Switch>
  );
};

export default Auction;
