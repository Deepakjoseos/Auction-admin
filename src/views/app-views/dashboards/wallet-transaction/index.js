import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import WalletTransactionList from './list-transactions';
import useUserPrivilege from 'hooks/useUserPrivilege';

const WalletTransaction = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('WALLET_TRANSACTION');
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/wallet-transaction-list`}
      />
      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/wallet-transaction-list`}
          component={WalletTransactionList}
        />
      )}
    </Switch>
  );
};

export default WalletTransaction;
