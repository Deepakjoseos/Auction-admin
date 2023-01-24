import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import AddParticipant from '../add-participant'
import ParticipantList from '../list-participant'

const Registration = (props) => {
  const { match } = props
  return (
    <Switch>
    <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/registration-list`}
      />
      {/* <Route path={`${match.url}/add-Participant`} component={AddParticipant} /> */}
      {/* <Route path={`${match.url}/edit-participant/:id`} component={EditParticipant} /> */}
      <Route path={`${match.url}/add-registration`} component={AddParticipant} />
      <Route path={`${match.url}/registration-list`} component={ParticipantList} />

    </Switch>
  )
}

export default Registration
