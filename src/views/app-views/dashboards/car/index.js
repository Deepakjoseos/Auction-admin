import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CarList from './car-list';
import AddCar from './add-car';
import EditCar from './edit-car';
import useUserPrivilege from 'hooks/useUserPrivilege';
// import Orders from './orders'

const Car = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('CAR');

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/car-list`} />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add-car`} component={AddCar} />
      )}
      {privileges.editPrivilege && (
        <Route path={`${match.url}/edit-car/:id`} component={EditCar} />
      )}
      <Route
        path={`${match.url}/car-list`}
        render={(props) => <CarList {...props} {...privileges} />}
      />
    </Switch>
  );
};

export default Car;
