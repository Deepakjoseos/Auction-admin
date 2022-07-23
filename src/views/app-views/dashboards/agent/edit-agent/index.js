import React from 'react'
import AgentForm from '../agentForm'


const EditAgent = (props) => {
  return <AgentForm mode="EDIT" param={props.match.params} />
}

export default EditAgent
