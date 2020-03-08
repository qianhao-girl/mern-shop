import React,{ Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './hocs/Auth/auth';
import Layout from './hocs/Layout/Layout';
import Error from './pages/error';

import Home from './pages/home';
import About from './pages/about';
import Register from './pages/AuthPages/RegisterPage/Register';
import Login from './pages/AuthPages/LoginPage/Login';
import Logout from './pages/AuthPages/LogoutPage/Logout';
import ResetPasswordPage from './pages/AuthPages/Reset/ResetPasswordPage/ResetPasswordPage';
import NewPasswordPage from './pages/AuthPages/Reset/NewPasswordPage/NewPasswordPage';
// import {Register, Login, Logout, ResetPasswordPage, NewPasswordPage  } from './pages/AuthPages/index'
import IndividualPage from './pages/IndividualPage/IndividualPage';
import Products from './pages/Products/Products';
import UpLoadProductPage from './pages/AdminPages/UploadProductPage/UploadProductPage';


export default class App extends Component{
  render(){
    return (
        <Layout>
          <Switch>
            <Route exact path="/" component={ Auth(Home, false) }></Route>
            <Route exact path="/about" component={ About }></Route>
            <Route exact path="/register" component={ Auth(Register, false) }></Route>
            <Route exact path="/login" component={ Auth(Login, false) }></Route>
            <Route exact path="/logout" component={ Auth(Logout, true)} />
            <Route exact path="/reset"  component={ResetPasswordPage} />
            <Route exact path="/reset/:token"  component={NewPasswordPage} />
            <Route exact path="/product/upload" component={Auth(UpLoadProductPage, true)}></Route>
            <Route exact path="/products" component={Auth(Products,null)} />
            <Route exact path="/admin/:slug" component={ Auth(IndividualPage, true)}></Route>
            <Route component={ Error }></Route>
          </Switch>
        </Layout>
    );
  }
}


