import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AddClient from './add-client'

import ClientList from './client-list'
import EditClient from './edit-client'

// import Orders from './orders'

// In here we will define all our routes
const Banner = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/client-list`} />
      <Route path={`${match.url}/add-client`} component={AddClient} />
      <Route path={`${match.url}/edit-client/:id`} component={EditClient} />
      <Route path={`${match.url}/client-list`} component={ClientList} />
    </Switch>
  )
}

export default Banner
