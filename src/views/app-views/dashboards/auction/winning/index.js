import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import WinningList from './winning-list';
import AddWinning from './add-winning';
import useUserPrivilege from 'hooks/useUserPrivilege';

const Winning = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('WINNING');
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/winning-list`} />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add-winning`} component={AddWinning} />
      )}
      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/winning-list`}
          render={(props) => <WinningList {...props} {...privileges} />}
        />
      )}
    </Switch>
  );
};

export default Winning;
