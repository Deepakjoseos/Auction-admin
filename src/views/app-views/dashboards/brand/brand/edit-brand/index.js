import React from 'react'
import BrandForm from '../brandForm'

const EditBrand = (props) => {
  return <BrandForm mode="EDIT" param={props.match.params} />
}

export default EditBrand
