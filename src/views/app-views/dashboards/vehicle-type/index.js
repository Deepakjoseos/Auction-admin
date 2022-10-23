import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddVehicleType from './add-vehicle-type';
import EditVehicleType from './edit-vehicle-type';
import VehicleTypeList from './list-vehicle-type';
import useUserPrivilege from 'hooks/useUserPrivilege';

const VehicleType = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('VEHICLE_TYPE');

  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/vehicle-type-list`}
      />
      {privileges.addPrivilege && (
        <Route
          path={`${match.url}/add-vehicle-type`}
          component={AddVehicleType}
        />
      )}
      {privileges.editPrivilege && (
        <Route
          path={`${match.url}/edit-vehicle-type/:id`}
          component={EditVehicleType}
        />
      )}
      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/vehicle-type-list`}
          render={(props) => <VehicleTypeList {...props} {...privileges} />}
        />
      )}
    </Switch>
  );
};

export default VehicleType;
