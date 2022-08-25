import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AddState from './add-state'

// import Orders from './orders'
import StateList from './list-state'

const States = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/state-list`}
      />
      

      <Route
        path={`${match.url}/state-list`}
        component={StateList}
      />
       <Route
        path={`${match.url}/add-state`}
        component={AddState}
      />
    </Switch>
  )
}

export default States
