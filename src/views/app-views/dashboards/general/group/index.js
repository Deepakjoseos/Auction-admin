import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddGroup from './add-group';
import EditGroup from './edit-group';

import GroupList from './group-list';
import UploadGroupMember from './upload-group-members';
import useUserPrivilege from 'hooks/useUserPrivilege';
// import Orders from './orders'

const Groups = (props) => {
  const { match } = props;

  const privileges = useUserPrivilege('GROUP');

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/group-list`} />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add-group`} component={AddGroup} />
      )}
      {privileges.editPrivilege && (
        <Route path={`${match.url}/edit-group/:id`} component={EditGroup} />
      )}
      {privileges.editPrivilege && (
        <Route
          path={`${match.url}/upload-members/:id`}
          component={UploadGroupMember}
        />
      )}
      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/group-list`}
          render={(props) => <GroupList {...props} {...privileges} />}
        />
      )}
    </Switch>
  );
};

export default Groups;
