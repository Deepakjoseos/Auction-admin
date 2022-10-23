import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import BrandList from './brand-list';
import AddBrand from './add-brand';
import EditBrand from './edit-brand';
import useUserPrivilege from 'hooks/useUserPrivilege';
// import Orders from './orders'

// In here we will define all our routes
const Brand = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('BRAND');

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/brands-list`} />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add-brand`} component={AddBrand} />
      )}
      {privileges.editPrivilege && (
        <Route path={`${match.url}/edit-brand/:id`} component={EditBrand} />
      )}
      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/brands-list`}
          render={(props) => <BrandList {...props} {...privileges} />}
        />
      )}
    </Switch>
  );
};

export default Brand;
