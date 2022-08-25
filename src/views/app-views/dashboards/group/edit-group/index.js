import React from 'react'
import FeeTypeForm from '../add-group/group-form'


const GroupType = (props) => {
  return <FeeTypeForm mode="EDIT" param={props.match.params} />
}

export default GroupType
