import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddEmployeeType from './add-employee-type';
import EditEmployeeType from './edit-employee-type';

import EmployeeTypeList from './list-employee-type';

const EmployeeType = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/employee-type-list`}
      />
      <Route
        path={`${match.url}/add-employee-type`}
        component={AddEmployeeType}
      />
      <Route
        path={`${match.url}/edit-employee-type/:id`}
        component={EditEmployeeType}
      />
      <Route
        path={`${match.url}/employee-type-list`}
        component={EmployeeTypeList}
      />
    </Switch>
  );
};

export default EmployeeType;
