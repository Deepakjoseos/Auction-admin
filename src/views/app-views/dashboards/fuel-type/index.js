import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AddFeeType from './add-fuel-type'
import EditFeeType from './edit-fuel-type'

import FeeTypeList from './fuel-type-list'
// import Orders from './orders'

const FeeType = (props) => {
  const { match } = props

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/fuel-type-list`} />
      <Route path={`${match.url}/add-fuel-type`} component={AddFeeType} />
      <Route path={`${match.url}/edit-fuel-type/:id`} component={EditFeeType} />
      <Route path={`${match.url}/fuel-type-list`} component={FeeTypeList} />
    </Switch>
  )
}

export default FeeType
