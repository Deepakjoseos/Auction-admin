import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddBanner from './add-banner';

import BannerList from './banner-list';
import EditBanner from './edit-banner';
import useUserPrivilege from 'hooks/useUserPrivilege';

// import Orders from './orders'

// In here we will define all our routes
const Banner = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('BANNER');

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/banner-list`} />
      {privileges.addPrivilege && <Route path={`${match.url}/add-banner`} component={AddBanner} />}
      {privileges.editPrivilege && <Route path={`${match.url}/edit-banner/:id`} component={EditBanner} />}
      <Route
        path={`${match.url}/banner-list`}
        render={(props) => <BannerList {...props} {...privileges} />}
      />
    </Switch>
  );
};

export default Banner;
