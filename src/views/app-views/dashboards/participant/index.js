import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Buyer from './buyer'
import Seller from './seller';

const Participant = (props) => {
    const {match} = props;
return(
    <Switch>
        {/* <Redirect
            exact
            from={`${match.url}`}
            to={`${match.url}/participant-new-list`}
        /> */}
        <Route
          path={`${match.url}/buyer`}
          component={Buyer}
        />
        <Route
          path={`${match.url}/seller`}
          component={Seller}
        />
    </Switch>
)
}

export default Participant