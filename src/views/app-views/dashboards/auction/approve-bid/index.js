import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import useUserPrivilege from 'hooks/useUserPrivilege';

import ApproveBidList from './approveBid-list';
import AddApproveBid from './add-approveBid';

const ApproveBid = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('APPROVE_BID');
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/approveBid-list`}
      />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add-approveBid`} component={AddApproveBid} />
      )}
      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/approveBid-list`}
          render={(props) => <ApproveBidList {...props} {...privileges} />}
        />
      )}
    </Switch>
  );
};

export default ApproveBid;
