import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LotteryList from './lottery-list'
import AddLottery from './add-lottery'
import EditLottery from './edit-lottery'
import LotteryGroupList from '../lottery-group/lottery-group-list'

// import Orders from './orders'

// In here we will define all our routes
const Lottery = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/lottery-list`} />
      <Route path={`${match.url}/add-lottery`} component={AddLottery} />
      <Route path={`${match.url}/edit-lottery/:id`} component={EditLottery} />
      <Route path={`${match.url}/lottery-list`} component={LotteryList} />
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default Lottery
