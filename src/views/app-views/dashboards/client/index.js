import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddClient from './add-client';

import ClientList from './client-list';
import EditClient from './edit-client';
import useUserPrivilege from 'hooks/useUserPrivilege';
// import Orders from './orders'

// In here we will define all our routes
const Banner = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('CLIENT');
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/client-list`} />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add-client`} component={AddClient} />
      )}
      {privileges.editPrivilege && (
        <Route path={`${match.url}/edit-client/:id`} component={EditClient} />
      )}
      <Route
        path={`${match.url}/client-list`}
        render={(props) => <ClientList {...props} {...privileges} />}
      />
    </Switch>
  );
};

export default Banner;
