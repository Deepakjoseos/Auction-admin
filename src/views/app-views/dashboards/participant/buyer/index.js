import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import BuyerList from './buyer-list'

const Buyer = (props) => {
 const {match} = props;
 return(
    <Switch>
        <Redirect 
            exact
            from={`${match.url}`}
            to = {`${match.url}/buyer-list`}
        />
        <Route 
            path={`${match.url}/buyer-list`}
            component={BuyerList}
        />
    </Switch>
 )
}
export default Buyer;