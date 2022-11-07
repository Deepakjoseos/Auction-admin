import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuctionList from './auction-list';

const Auction = (props) => {
  const { match, sellerId } = props;

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/auction-list`} />

      <Route
        path={`${match.url}/auction-list`}
        render={(props) => <AuctionList {...props} />}
      />
    </Switch>
  );
};

export default Auction;
