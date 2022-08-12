import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Loading from 'components/shared-components/Loading'
import { useSelector } from 'react-redux'

const Dashboards = ({ match }) => {
  const { user } = useSelector((state) => state.auth)
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${match.url}/user`}
          component={lazy(() => import(`./user`))}
        />
        <Route
          path={`${match.url}/car`}
          component={lazy(() => import(`./car`))}
        />
        <Route
          path={`${match.url}/information`}
          component={lazy(() => import(`./information`))}
        />
        <Route
          path={`${match.url}/settings`}
          component={lazy(() => import(`./settings`))}
        />
        <Route
          path={`${match.url}/banner`}
          component={lazy(() => import(`./banner`))}
        />
        <Route
          path={`${match.url}/brand`}
          component={lazy(() => import(`./brand`))}
        />
        <Route
          path={`${match.url}/vehicle-type`}
          component={lazy(() => import(`./vehicle-type`))}
        />
        <Route
          path={`${match.url}/fee-type`}
          component={lazy(() => import(`./fee-type`))}
        />
        <Route
          path={`${match.url}/participant`}
          component={lazy(() => import(`./participant`))}
        />
        {/* <Route
          path={`${match.url}/state`}
          component={lazy(() => import(`./state`))}
        />
        <Route
          path={`${match.url}/role`}
          component={lazy(() => import(`./role`))}
        /> */}
        <Route
          path={`${match.url}/client`}
          component={lazy(() => import(`./client`))}
        />
        {window.localStorage.getItem('auth_type') === 'Admin' ? (
          <Redirect from={`${match.url}`} to={`${match.url}/user`} />
        ) : (
          <Redirect from={`${match.url}`} to={`${match.url}/car`} />
        )}
      </Switch>
    </Suspense>
  )
}

export default Dashboards
