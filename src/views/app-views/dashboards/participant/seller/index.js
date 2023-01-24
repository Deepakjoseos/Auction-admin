import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom'
import SellerList from './seller-list';

const Seller = (props) => {
    const {match} = props
    return(
        <Switch>
            <Redirect 
                exact
                from={`${match.url}`}
                to={`${match.url}/seller-list`}
            />
            <Route
                path={`${match.url}/seller-list`}
                component={SellerList}
            />
        </Switch>
    )
}
export default Seller