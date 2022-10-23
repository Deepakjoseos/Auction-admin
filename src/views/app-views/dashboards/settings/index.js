import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AddSettings from './add-settings';
import SettingsList from './settings-list';
import EditSettings from './edit-settings';

import useUserPrivilege from 'hooks/useUserPrivilege';
// import Orders from './orders'

const Settings = (props) => {
  const { match } = props;

  const privileges = useUserPrivilege('SETINGS');

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/edit-settings`} />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add-settings`} component={AddSettings} />
      )}
      {privileges.editPrivilege && (
        <Route path={`${match.url}/edit-settings`} component={EditSettings} />
      )}
      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/settings-list`}
          render={(props) => <SettingsList {...props} {...privileges} />}
        />
      )}
    </Switch>
  );
};

export default Settings;
