import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddCity from './add-city';
import EditCity from './edit-city';
import CityList from './list-city';
import useUserPrivilege from 'hooks/useUserPrivilege';

const City = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('CITY');
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/city-list`} />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add-city`} component={AddCity} />
      )}
      {privileges.editPrivilege && (
        <Route path={`${match.url}/edit-city/:id`} component={EditCity} />
      )}
      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/city-list`}
          render={(props) => <CityList {...props} {...privileges} />}
        />
      )}
    </Switch>
  );
};

export default City;
