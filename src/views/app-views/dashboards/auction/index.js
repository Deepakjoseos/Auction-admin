import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Auction from './auction'
import AuctionInventory from './auction-inventory'
import Bidding from './bidding'

const Auctions
 = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/auction/auction-list`}
      />
      <Route path={`${match.url}/auction`} component={Auction} />
      <Route path={`${match.url}/auction-inventory`} component={AuctionInventory} />
      <Route path={`${match.url}/bidding`} component={Bidding} />

    </Switch>
  )
}

export default Auctions

