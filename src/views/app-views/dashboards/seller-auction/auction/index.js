import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuctionList from './auction-list';

const Auction = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/auction-list`} />

      <Route path={`${match.url}/auction-list`} component={AuctionList} />
    </Switch>
  );
};

export default Auction;
