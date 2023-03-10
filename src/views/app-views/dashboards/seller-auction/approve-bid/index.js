import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ApproveBidList from './approveBid-list';

const ApproveBid = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/approveBid-list`}
      />

      <Route path={`${match.url}/approveBid-list`} component={ApproveBidList} />

    </Switch>
  );
};

export default ApproveBid;
