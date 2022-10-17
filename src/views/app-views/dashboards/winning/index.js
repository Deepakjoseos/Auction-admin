import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import WinningList from './winning-list';
import AddWinning from './add-winning';

const Winning = (props) => {
    const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/winning-list`} />
      <Route path={`${match.url}/add-winning`} component={AddWinning} />
      <Route path={`${match.url}/winning-list`} component={WinningList} />
    </Switch>
  );
};

export default Winning;
