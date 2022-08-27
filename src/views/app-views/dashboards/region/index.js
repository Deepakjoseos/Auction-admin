import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Addregion from "./add-region";

import regionList from "./region-list";
import Editregion from "./edit-region";

// import Orders from './orders'

// In here we will define all our routes
const Banner = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/region-list`} />
      <Route path={`${match.url}/add-region`} component={Addregion} />
      <Route path={`${match.url}/edit-region/:id`} component={Editregion} />
      <Route path={`${match.url}/region-list`} component={regionList} />
    </Switch>
  );
};

export default Banner;
