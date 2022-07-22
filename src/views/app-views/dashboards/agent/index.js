import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AddAgent from './add-agent'
// import LotteryList from './lottery-list'
// import AddLottery from './add-lottery'
// import EditLottery from './edit-lottery'
// import LotteryGroupList from '../lottery-group/lottery-group-list'
import AgentList from './agent-list'
import EditAgent from './edit-agent'

// import Orders from './orders'

// In here we will define all our routes
const Agent = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/agent-list`} />
      <Route path={`${match.url}/add-agent`} component={AddAgent} />
      <Route path={`${match.url}/edit-agent/:id`} component={EditAgent} />
      <Route path={`${match.url}/agent-list`} component={AgentList} />
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default Agent
