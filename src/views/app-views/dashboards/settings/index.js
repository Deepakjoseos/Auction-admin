import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import AddSettings from './add-settings'
import SettingsList from './settings-list'
import EditSettings from './edit-settings'
// import Orders from './orders'

const Settings = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/edit-settings`}
      />
      <Route path={`${match.url}/add-settings`} component={AddSettings} />
      <Route
        path={`${match.url}/edit-settings`}
        component={EditSettings}
      />
      <Route
        path={`${match.url}/settings-list`}
        component={SettingsList}
      />
    </Switch>
  )
}

export default Settings
