import React from 'react'
import FeeTypeForm from '../add-fee-type/fee-type-form'


const EditFeeType = (props) => {
  return <FeeTypeForm mode="EDIT" param={props.match.params} />
}

export default EditFeeType
