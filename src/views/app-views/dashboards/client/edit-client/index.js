import React from 'react'
import ClientForm from '../clientForm'

const EditClient = (props) => {
  return <ClientForm mode="EDIT" param={props.match.params} />
}

export default EditClient
