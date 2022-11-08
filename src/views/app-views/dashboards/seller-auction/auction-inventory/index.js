import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuctionInventoryList from './auction-inventory-list';

const AuctionInventory = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/auction-inventory-list`}
      />

      <Route
        path={`${match.url}/auction-inventory-list`}
        component={AuctionInventoryList}
      />
    </Switch>
  );
};

export default AuctionInventory;
