import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddFeeType from './add-fee-type';
import EditFeeType from './edit-fee-type';
import FeeTypeList from './fee-type-list';

import useUserPrivilege from 'hooks/useUserPrivilege';
// import Orders from './orders'

const FeeType = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('FEE_TYPE');
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/fee-type-list`} />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add-fee-type`} component={AddFeeType} />
      )}
      {privileges.editPrivilege && (
        <Route
          path={`${match.url}/edit-fee-type/:id`}
          component={EditFeeType}
        />
      )}
      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/fee-type-list`}
          render={(props) => <FeeTypeList {...props} {...privileges} />}
        />
      )}
    </Switch>
  );
};

export default FeeType;
