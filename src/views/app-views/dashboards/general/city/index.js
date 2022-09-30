import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AddCity from "./add-city";
import EditCity from "./edit-city";
import CityList from "./list-city";

const City = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/city-list`} />
      <Route path={`${match.url}/add-city`} component={AddCity} />
      <Route path={`${match.url}/edit-city/:id`} component={EditCity} />
      <Route path={`${match.url}/city-list`} component={CityList} />
    </Switch>
  );
};

export default City;
