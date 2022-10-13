import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import WatchlistList from './Watchlistlist'
// import AddWatchlist from './Add-watchlist'
// import EditWatchlist from './Edit-watchlist'

const Watchlist = (props) => {
  const { match } = props
  return (
    <Switch>
       <Redirect exact from={`${match.url}`} to={`${match.url}/Watchlistlist`} /> 
      {/* // <Route path={`${match.url}/Add-watchlist`} component={AddWatchlist} />
      // <Route path={`${match.url}/Edit-watchlist/:id`} component={EditWatchlist} /> */} 
      <Route path={`${match.url}/Watchlistlist`} component={WatchlistList} />
    </Switch>
  )
}

export default Watchlist
