import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AddGroup from "./add-group";
import EditGroup from "./edit-group";

import GroupList from "./group-list";
// import Orders from './orders'

const FeeType = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/group-list`} />
      <Route path={`${match.url}/add-group`} component={AddGroup} />
      <Route path={`${match.url}/edit-group/:id`} component={EditGroup} />
      <Route path={`${match.url}/group-list`} component={GroupList} />
    </Switch>
  );
};

export default FeeType;
