import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Dashboards = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${match.url}/profile`}
          component={lazy(() => import(`./profile`))}
        />
        <Route
          path={`${match.url}/default`}
          component={lazy(() => import(`./default`))}
        />
        <Route
          path={`${match.url}/analytic`}
          component={lazy(() => import(`./analytic`))}
        />
        {/* <Route
          path={`${match.url}/sales`}
          component={lazy(() => import(`./sales`))}
        /> */}
        <Route
          path={`${match.url}/catalog`}
          component={lazy(() => import(`./catalog`))}
        />

        <Route
          path={`${match.url}/lottery`}
          component={lazy(() => import(`./lottery`))}
        />
        <Route
          path={`${match.url}/lottery-group`}
          component={lazy(() => import(`./lottery-group`))}
        />

        <Route
          path={`${match.url}/lottery-type`}
          component={lazy(() => import(`./lottery-type`))}
        />
     <Route
          path={`${match.url}/agent`}
          component={lazy(() => import(`./agent`))}
        />
        <Redirect from={`${match.url}`} to={`${match.url}/default`} />
      </Switch>
    </Suspense>
  );
};

export default Dashboards;
