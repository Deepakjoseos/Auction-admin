import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddEmployeeType from './add-employee-type';
import EditEmployeeType from './edit-employee-type';
import EmployeeTypeList from './list-employee-type';
import useUserPrivilege from 'hooks/useUserPrivilege';

const EmployeeType = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('AUCTION');
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/employee-type-list`}
      />
      {privileges.addPrivilege && (
        <Route
          path={`${match.url}/add-employee-type`}
          component={AddEmployeeType}
        />
      )}
      {privileges.editPrivilege && (
        <Route
          path={`${match.url}/edit-employee-type/:id`}
          component={EditEmployeeType}
        />
      )}
      <Route
        path={`${match.url}/employee-type-list`}
        render={(props) => <EmployeeTypeList {...props} {...privileges} />}
      />
    </Switch>
  );
};

export default EmployeeType;
