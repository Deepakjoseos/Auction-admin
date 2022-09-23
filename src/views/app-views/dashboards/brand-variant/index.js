import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AddBrandVariant from "./add-brand";
import BrandVariantList from "./brand-list";
import EditBrandVariant from "./edit-brand-variants";

const BrandVariant = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add`} component={AddBrandVariant} />
      <Route path={`${match.url}/edit/:id`} component={EditBrandVariant} />
      <Route path={`${match.url}/list`} component={BrandVariantList} />
    </Switch>
  );
};

export default BrandVariant;
