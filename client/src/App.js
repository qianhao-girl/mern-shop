import React,{ Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/views/home';
import About from './components/views/about';
import Register from './components/views/register';
import Login from './components/views/LoginPage/login';
import Error from './components/views/error';

import Layout from './hocs/Layout/Layout';

export default class App extends Component{
  render(){
    return (
      <div className="hello">
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/register" component={ Register }></Route>
            <Route path="/login" component={ Login }></Route>
            <Route component={Error}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}


