import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Addregion from "./add-region";

import RegionList from "./region-list";
import Editregion from "./edit-region";
import useUserPrivilege from "hooks/useUserPrivilege";

// import Orders from './orders'

// In here we will define all our routes
const Region = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('REGION');
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/region-list`} />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add-region`} component={Addregion} />
      )}
      {privileges.editPrivilege && (
        <Route path={`${match.url}/edit-region/:id`} component={Editregion} />
      )}
      <Route
        path={`${match.url}/region-list`}
        render={(props) => <RegionList {...props} {...privileges} />}
      />
    </Switch>
  );
};

export default Region;
