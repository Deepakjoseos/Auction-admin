import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import BiddingList from './bidding-list';

const Bidding = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/bidding-list`} />

      <Route path={`${match.url}/bidding-list`} component={BiddingList} />

    </Switch>
  );
};

export default Bidding;
