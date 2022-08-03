
import React from 'react'

import SettingsForm from '../settingsForm'

const EditSettings = (props) => {
  return <SettingsForm mode="EDIT" param={props.match.params} />
}

export default EditSettings
