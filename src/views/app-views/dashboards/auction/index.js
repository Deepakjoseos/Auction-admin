import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auction from './auction';
import AuctionInventory from './auction-inventory';
import Bidding from './bidding';
import Watchlist from './watchlist';
import Comment from './comment';
import Winning from './winning';
import ApproveBid from './approve-bid';

const Auctions = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/auction/auction-list`}
      />
      <Route path={`${match.url}/auction`} component={Auction} />
      <Route
        path={`${match.url}/auction-inventory`}
        component={AuctionInventory}
      />
      <Route path={`${match.url}/bidding`} component={Bidding} />
      <Route path={`${match.url}/watchlist`} component={Watchlist} />
      <Route path={`${match.url}/comment`} component={Comment} />
      <Route path={`${match.url}/winning`} component={Winning} />
      <Route path={`${match.url}/approve-bid`} component={ApproveBid} />
    </Switch>
  );
};

export default Auctions;
