import React from 'react'
import BrandForm from '../BrandForm'

const EditProduct = (props) => {
  return <BrandForm mode="EDIT" param={props.match.params} />
}

export default EditProduct
