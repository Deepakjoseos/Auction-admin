import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UpdateBuyingLimit from './buying-limit';
import WalletList from './list-wallet';
import useUserPrivilege from 'hooks/useUserPrivilege';

const Wallet = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('BUYING_LIMIT');
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/wallet-list`} />

      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/wallet-list`}
          render={(props) => <WalletList {...props} {...privileges} />}
        />
      )}
      {privileges.editPrivilege && (
        <Route
          path={`${match.url}/update-buying-limit/:id`}
          component={UpdateBuyingLimit}
        />
      )}
    </Switch>
  );
};

export default Wallet;
