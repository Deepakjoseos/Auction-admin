import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Dashboards = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${match.url}/user`}
          component={lazy(() => import(`./user`))}
        />
        <Route
          path={`${match.url}/information`}
          component={lazy(() => import(`./information`))}
        />
          <Route
          path={`${match.url}/settings`}
          component={lazy(() => import(`./settings`))}
        />
        <Redirect from={`${match.url}`} to={`${match.url}/user`} />
      </Switch>
    </Suspense>
  );
};

export default Dashboards;
