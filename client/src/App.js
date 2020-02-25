import React,{ Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/home';
import About from './containers/about';
import Register from './containers/AuthPages/RegisterPage/Register';
import Login from './containers/AuthPages/LoginPage/Login';
import Logout from './containers/AuthPages/LogoutPage/Logout';
import Error from './containers/error';

import Layout from './hocs/Layout/Layout';

import Auth from './hocs/Auth/auth';

export default class App extends Component{
  render(){
    return (
      <div className="hello">
        <Layout>
          <Switch>
            <Route exact path="/" component={ Auth(Home,null)}></Route>
            <Route path="/about" component={ Auth(About, null)}></Route>
            <Route path="/register" component={ Auth(Register, false) }></Route>
            <Route path="/login" component={ Auth(Login, false) }></Route>
            <Route path="/logout" component={ Auth(Logout, true)} />
            <Route component={Error}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}


