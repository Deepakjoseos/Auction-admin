import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DepositList from './list-deposit';
import MakeDeposit from './make-deposit';
import useUserPrivilege from 'hooks/useUserPrivilege';

const Deposit = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('DEPOSIT');
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/deposit-list`} />
      {privileges.addPrivilege && (
        <Route path={`${match.url}/make-deposit`} component={MakeDeposit} />
      )}
      <Route
        path={`${match.url}/deposit-list`}
        render={(props) => <DepositList {...props} {...privileges} />}
      />
    </Switch>
  );
};

export default Deposit;
