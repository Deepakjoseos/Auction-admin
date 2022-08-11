import React from 'react'
import ParticipantForm from '../participant-form'

const EditParticipant = (props) => {
  return <ParticipantForm mode="EDIT" param={props.match.params} />
}

export default EditParticipant
