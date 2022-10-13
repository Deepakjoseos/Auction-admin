import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Brand from './brand'
import BrandVariant from './brand-variant'

const Brands
 = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/brand/brands-list`}
      />
      <Route path={`${match.url}/brand`} component={Brand} />
      <Route path={`${match.url}/brand-variant`} component={BrandVariant} />
    </Switch>
  )
}

export default Brands

