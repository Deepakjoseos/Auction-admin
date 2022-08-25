import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AddCity from './add-city'

// import Orders from './orders'
import CityList from './list-city'

const States = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/city-list`}
      />
      

      <Route
        path={`${match.url}/city-list`}
        component={CityList}
      />
       <Route
        path={`${match.url}/add-city`}
        component={AddCity}
      />
    </Switch>
  )
}

export default States
