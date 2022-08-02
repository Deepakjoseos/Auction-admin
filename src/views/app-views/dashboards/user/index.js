import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AddUser from "./add-user";
import UserList from "./list-users";

const User = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/user-list`} />
      <Route path={`${match.url}/add-user`} component={AddUser} />
      <Route path={`${match.url}/user-list`} component={UserList} />
    </Switch>
  );
};

export default User;
