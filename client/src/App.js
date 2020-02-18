import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/views/home';
import About from './components/views/about';
import Register from './components/views/register';
import Login from './components/views/login';
import Error from './components/views/error';


export default function App(){
  return (
    <div className="hello">
      <h1>hello world</h1>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/register" component={ Register }></Route>
        <Route path="/login" component={ Login }></Route>
        <Route component={Error}></Route>
      </Switch>
    </div>
  );
}


