import React from 'react'
import CarForm from '../CarForm'

const EditProduct = (props) => {
  return <CarForm mode="EDIT" param={props.match.params} />
}

export default EditProduct
