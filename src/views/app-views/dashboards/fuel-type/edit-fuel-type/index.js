import React from 'react'
import FeeTypeForm from '../add-fuel-type/fuel-type-form'


const EditFeeType = (props) => {
  console.log(props);
  return <FeeTypeForm mode="EDIT" param={props.match.params} />
}

export default EditFeeType
