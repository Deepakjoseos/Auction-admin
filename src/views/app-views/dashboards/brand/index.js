import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import BrandList from './brand-list'
import AddBrand from './add-brand'
import EditBrand from './edit-brand'
// import Orders from './orders'

// In here we will define all our routes
const Brand = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/brands-list`} />
      <Route path={`${match.url}/add-brand`} component={AddBrand} />
      <Route path={`${match.url}/edit-brand/:id`} component={EditBrand} />
      <Route path={`${match.url}/brands-list`} component={BrandList} />
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default Brand
