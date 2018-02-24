import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from '../containers/home'
import Users from '../containers/users';
import Roles from '../containers/roles'
import NotFound from '../containers/notfound'
const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/roles" exact component={Roles} />
            <Route path="/users" exact component={Users}/>
            <Route path='/404' component={NotFound} />
            <Redirect from='*' to='/404' />
        </Switch>
    </Router>
);

export default Routes;