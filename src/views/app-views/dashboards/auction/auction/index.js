import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddAuction from './add-auction';
import EditAuction from './edit-auction';
import useUserPrivilege from 'hooks/useUserPrivilege';
import AuctionList from './auction-list';
// import Orders from './orders'

const Auction = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('AUCTION');

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/auction-list`} />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/add-auction`} component={AddAuction} />
      )}
      {privileges.editPrivilege && (
        <Route path={`${match.url}/edit-auction/:id`} component={EditAuction} />
      )}
      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/auction-list`}
          render={(props) => <AuctionList {...props} {...privileges} />}
        />
      )}
    </Switch>
  );
};

export default Auction;
