import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import informationList from './information-list'
import AddInformation from './add-information'
import EditInformation from './edit-information'
// import Orders from './orders'

const Information = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/information-list`}
      />
      <Route path={`${match.url}/add-information`} component={AddInformation} />
      <Route
        path={`${match.url}/edit-information/:id`}
        component={EditInformation}
      />
      <Route
        path={`${match.url}/information-list`}
        component={informationList}
      />
    </Switch>
  )
}

export default Information
