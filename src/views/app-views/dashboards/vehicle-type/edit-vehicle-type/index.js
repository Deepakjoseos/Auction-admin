import React from 'react'
import VehicleTypeForm from '../vehicle-type-form'

const EditVehicleType = (props) => {
  return <VehicleTypeForm mode="EDIT" param={props.match.params} />
}

export default EditVehicleType
