import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddState from './add-state';
import EditState from './edit-state';
import StateList from './list-state';

import useUserPrivilege from 'hooks/useUserPrivilege';

const States = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('STATE');
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/state-list`} />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add-state`} component={AddState} />
      )}
      {privileges.editPrivilege && (
        <Route path={`${match.url}/edit-state/:id`} component={EditState} />
      )}
      <Route
        path={`${match.url}/state-list`}
        render={(props) => <StateList {...props} {...privileges} />}
      />
    </Switch>
  );
};

export default States;
