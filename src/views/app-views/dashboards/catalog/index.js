import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Brand from './brand/index'

const Catalog = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/brand/brands-list`}
      />
      <Route path={`${match.url}/brand`} component={Brand} />
    </Switch>
  )
}

export default Catalog
