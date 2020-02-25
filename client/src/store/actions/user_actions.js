import axios from 'axios';

import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
    AUTHEN_USER,
} from './types';

export function registerUser(dataToSubmit){
    // console.log("hi, i'm in registerUser action creater");
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => {return response.data})
        .catch(err =>{return err;});
    return{
        type:REGISTER_USER,
        payload: request,
    }
}

export function loginUser(dataToSubmit){
    // console.log("hi, i'm in loginUser action creater");
    const request = axios.post('/api/users/login',dataToSubmit)
        .then(response => response.data);
    ;
    return{
        type: LOGIN_USER,
        payload: request
    }
}

export function logoutUser(){
    // console.log("hi, i'm in logoutUser action creater");
    const request = axios.get(`/api/users/logout`)
    .then(response => response.data);
    return {
        type: LOGOUT_USER,
        payload: request
    }
};


export function auth(){
    // console.log("hi, i'm in auth action creater");
    const request = axios.get('/api/users/auth').then(response => response.data);

    return {
        type:AUTHEN_USER,
        payload: request
    }
}

