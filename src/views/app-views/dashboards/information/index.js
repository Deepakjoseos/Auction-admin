import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import InformationList from './information-list';
import AddInformation from './add-information';
import EditInformation from './edit-information';
import useUserPrivilege from 'hooks/useUserPrivilege';
// import Orders from './orders'

const Information = (props) => {
  const { match } = props;

  const privileges = useUserPrivilege('INFORMATION');

  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/information-list`}
      />
      {privileges.addPrivilege && (
        <Route
          path={`${match.url}/add-information`}
          render={(props) => <AddInformation {...props} />}
        />
      )}
      {privileges.editPrivilege && (
        <Route
          path={`${match.url}/edit-information/:id`}
          render={(props) => <EditInformation {...props} />}
        />
      )}
      <Route
        path={`${match.url}/information-list`}
        render={(props) => <InformationList {...props} {...privileges} />}
      />
    </Switch>
  );
};

export default Information;
