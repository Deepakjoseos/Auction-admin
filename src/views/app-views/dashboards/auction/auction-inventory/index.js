import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddAuction from './add-auction';
import AuctionInventoryList from './auction-inventory-list';
import EditAuctionInventory from './edit-auction';
import useUserPrivilege from 'hooks/useUserPrivilege';

const AuctionInventory = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('AUCTION_INVENTORY');

  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/auction-inventory-list`}
      />
      {privileges.addPrivilege && (
        <Route
          path={`${match.url}/add-auction-inventory`}
          component={AddAuction}
        />
      )}
      {privileges.editPrivilege && (
        <Route
          path={`${match.url}/edit-auction-inventory/:id`}
          component={EditAuctionInventory}
        />
      )}
      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/auction-inventory-list`}
          render={(props) => (
            <AuctionInventoryList {...props} {...privileges} />
          )}
        />
      )}
    </Switch>
  );
};

export default AuctionInventory;
