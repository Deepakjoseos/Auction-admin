import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddBrandVariant from './add-brand';
import BrandVariantList from './brand-list';
import EditBrandVariant from './edit-brand-variants';
import useUserPrivilege from 'hooks/useUserPrivilege';

const BrandVariant = (props) => {
  const { match } = props;

  const privileges = useUserPrivilege('BRAND_VARIANT');

  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/brand-variant-list`}
      />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add`} component={AddBrandVariant} />
      )}
      {privileges.editPrivilege && (
        <Route path={`${match.url}/edit/:id`} component={EditBrandVariant} />
      )}
      <Route
        path={`${match.url}/brand-variant-list`}
        render={(props) => <BrandVariantList {...props} {...privileges} />}
      />
    </Switch>
  );
};

export default BrandVariant;
