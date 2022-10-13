
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import City from './city'
import States from './state'

import Groups from './group'
import Region from './region'

const General
 = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/city/city-list`}
      />
      <Route path={`${match.url}/city`} component={City} />
      <Route path={`${match.url}/group`} component={Groups} />
      <Route path={`${match.url}/region`} component={Region} />
      <Route path={`${match.url}/state`} component={States} />


      
    </Switch>
  )
}

export default General

