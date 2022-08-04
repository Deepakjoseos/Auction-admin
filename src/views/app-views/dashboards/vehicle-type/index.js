import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AddVehicleType from './add-vehicle-type'
import EditVehicleType from './edit-vehicle-type'
import VehicleTypeList from './list-vehicle-type'
const VehicleType = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/vehicle-type-list`}
      />
       <Route path={`${match.url}/add-vehicle-type`} component={AddVehicleType} />
      <Route
        path={`${match.url}/edit-vehicle-type/:id`}
        component={EditVehicleType}
      /> 
      <Route
        path={`${match.url}/vehicle-type-list`}
        component={VehicleTypeList}
      />
    </Switch>
  )
}

export default VehicleType
