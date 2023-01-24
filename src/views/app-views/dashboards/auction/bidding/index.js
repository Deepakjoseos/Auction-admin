import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import BiddingList from './bidding-list';

import useUserPrivilege from 'hooks/useUserPrivilege';
// import Orders from './orders'

const Bidding = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('BIDDING');
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/bidding-list`} />
      {/* <Route path={`${match.url}/add-auction`} component={AddAuction} />
      <Route path={`${match.url}/edit-auction/:id`} component={EditAuction} /> */}
      {privileges.fetchPrivilege && (
        <Route path={`${match.url}/bidding-list`} component={BiddingList} />
      )}
    </Switch>
  );
};

export default Bidding;
