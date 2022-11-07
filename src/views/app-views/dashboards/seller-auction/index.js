import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Auction from './auction';
import AuctionInventory from './auction-inventory';
// import Bidding from './bidding';
// import Watchlist from './watchlist';
// import Comment from './comment';
// import Winning from './winning';
// import ApproveBid from './approve-bid';

const SellerAuctions = ({ match }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/auction`} />
      <Route
        path={`${match.url}/auction`}
        render={(props) => <Auction {...props} sellerId={user._id} />}
      />
      <Route
        path={`${match.url}/auction-inventory`}
        render={(props) => <AuctionInventory {...props} sellerId={user._id} />}
      />
      {/* 
      <Route path={`${match.url}/bidding`} component={Bidding} />
      <Route path={`${match.url}/watchlist`} component={Watchlist} />
      <Route path={`${match.url}/comment`} component={Comment} />
      <Route path={`${match.url}/winning`} component={Winning} />
      <Route path={`${match.url}/approve-bid`} component={ApproveBid} /> */}
    </Switch>
  );
};

export default SellerAuctions;
