import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import WatchlistList from './Watchlistlist';

const Watchlist = (props) => {
  const { match, sellerId } = props;

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/Watchlistlist`} />


      <Route path={`${match.url}/Watchlistlist`} component={WatchlistList} />
    </Switch>
  );
};

export default Watchlist;
