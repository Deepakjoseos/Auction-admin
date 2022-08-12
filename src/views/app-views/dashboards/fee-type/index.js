import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AddFeeType from './add-fee-type'
import EditFeeType from './edit-fee-type'

import FeeTypeList from './fee-type-list'
// import Orders from './orders'

const FeeType = (props) => {
  const { match } = props

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/fee-type-list`} />
      <Route path={`${match.url}/add-fee-type`} component={AddFeeType} />
      <Route path={`${match.url}/edit-fee-type/:id`} component={EditFeeType} />
      <Route path={`${match.url}/fee-type-list`} component={FeeTypeList} />
    </Switch>
  )
}

export default FeeType
