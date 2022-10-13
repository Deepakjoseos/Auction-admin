import React from 'react'
import TemplateForm from '../TemplateForm'

const EditTemplate = (props) => {
  return <TemplateForm mode="EDIT" param={props.match.params} />
}

export default EditTemplate
