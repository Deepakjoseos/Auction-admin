import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'


import EditParticipant from './edit-participant'
import AddParticipant from './add-participant'
import ParticipantList from './list-participant'

const Participant = (props) => {
  const { match } = props
  return (
    <Switch>
    <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/participant-list`}
      />
      {/* <Route path={`${match.url}/add-Participant`} component={AddParticipant} /> */}
      <Route path={`${match.url}/edit-participant/:id`} component={EditParticipant} />
      <Route path={`${match.url}/add-participant`} component={AddParticipant} />
      <Route path={`${match.url}/participant-list`} component={ParticipantList} />

    </Switch>
  )
}

export default Participant
