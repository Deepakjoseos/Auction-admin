import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import RolesList from './role-list'
import AddRole from './add-role'
// import Orders from './orders'

const Role = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/role-list`}
      />
      <Route path={`${match.url}/add-role`} component={AddRole} />
   
      <Route
        path={`${match.url}/role-list`}
        component={RolesList}
      />
    </Switch>
  )
}

export default Role
