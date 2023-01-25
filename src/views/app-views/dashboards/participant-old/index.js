import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import EditParticipant from './edit-participant';
import AddParticipant from './add-participant';
import ParticipantList from './list-participant';
import useUserPrivilege from 'hooks/useUserPrivilege';

const Participant = (props) => {
  const { match } = props;
  const privileges = useUserPrivilege('PARTICIPANT');

  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/participant-list`}
      />
      {/* <Route path={`${match.url}/add-Participant`} component={AddParticipant} /> */}
      {privileges.editPrivilege && (
        <Route
          path={`${match.url}/edit-participant/:id`}
          component={EditParticipant}
        />
      )}
      {privileges.addPrivilege && (
        <Route
          path={`${match.url}/add-participant`}
          component={AddParticipant}
        />
      )}
      {privileges.fetchPrivilege && (
        <Route
          path={`${match.url}/participant-list`}
          render={(props) => <ParticipantList {...props} {...privileges} />}
        />
      )}
    </Switch>
  );
};

export default Participant;
