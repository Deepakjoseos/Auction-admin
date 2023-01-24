import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RegistrationList from './registration-list';
import useUserPrivilege from 'hooks/useUserPrivilege';

const Registration = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('REGISTRATION');

  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/registration-list`}
      />
      {/* {privileges.editPrivilege && (
        <Route
          path={`${match.url}/edit-registration/:id`}
          component={EditParticipant}
        />
      )}
      {privileges.addPrivilege && (
        <Route
          path={`${match.url}/add-registration`}
          component={AddParticipant}
        />
      )} */}

      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/registration-list`}
          render={(props) => <RegistrationList {...props} {...privileges} />}
        />
      )}
    </Switch>
  );
};

export default Registration;
