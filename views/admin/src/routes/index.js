import React from 'react';
import {Switch, Route, Redirect,BrowserRouter as Router} from 'react-router-dom';
import Home from '../containers/home'
import Users from '../containers/users';
import Roles from '../containers/roles'
import NotFound from '../containers/notfound'
import Price from '../containers/price'
import Order from '../containers/order'
class Routes extends React.Component{
    render(){
        return(
            <Router >
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/roles"  component={Roles} />
                    <Route path="/users"  component={Users}/>
                    <Route path="/price"  component={Price} />
                    <Route path="/order"  component={Order} />
                    <Route path='/404' component={NotFound} />
                    <Redirect from='*' to='/404' />
                </Switch>
            </Router>
        )
    }
}


export default Routes;