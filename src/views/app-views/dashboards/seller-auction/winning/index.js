import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import WinningList from './winning-list';

const Winning = (props) => {
  const { match, sellerId } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/winning-list`} />
      <Route
        path={`${match.url}/winning-list`}
        render={(props) => <WinningList {...props} />}
      />
    </Switch>
  );
};

export default Winning;
