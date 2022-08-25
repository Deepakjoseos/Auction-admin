import React from 'react'
import FuelTypeForm from '../add-fuel-type/fuel-type-form'


const EditFuelType = (props) => {
  console.log(props);
  return <FuelTypeForm mode="EDIT" param={props.match.params} />
}

export default EditFuelType
