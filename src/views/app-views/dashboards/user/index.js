import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddUser from './add-user';
import EditUser from './edit-user';
import UserList from './list-users';
import { useSelector } from 'react-redux';

const User = (props) => {
  const { match } = props;
  const { user } = useSelector((state) => state.auth);
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/user-list`} />
      {user.auth === 'Admin' && (
        <>
          <Route path={`${match.url}/add-user`} component={AddUser} />
          <Route path={`${match.url}/edit-user/:id`} component={EditUser} />
          <Route path={`${match.url}/user-list`} component={UserList} />
        </>
      )}
    </Switch>
  );
};

export default User;
