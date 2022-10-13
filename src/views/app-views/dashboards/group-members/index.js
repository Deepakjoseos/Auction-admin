import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import GroupMemberList from "./list-group-members";

const FeeType = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/group-member-list`}
      />
      <Route
        path={`${match.url}/group-member-list`}
        component={GroupMemberList}
      />
    </Switch>
  );
};

export default FeeType;
