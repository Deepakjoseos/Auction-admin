import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CarList from './car-list'
import AddCar from './add-car'
import EditCar from './edit-car'
// import Orders from './orders'

const Car = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/car-list`} />
      <Route path={`${match.url}/add-car`} component={AddCar} />
      <Route path={`${match.url}/edit-car/:id`} component={EditCar} />
      <Route path={`${match.url}/car-list`} component={CarList} />
    </Switch>
  )
}

export default Car
