import axios from 'axios';

import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
    AUTHEN_USER,
} from './types';

export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => {return response.data})
        .catch(err =>{return err;});
    return{
        type:REGISTER_USER,
        payload: request,
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login',dataToSubmit)
        .then(response => response.data);
    ;
    return{
        type: LOGIN_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`/api/users/logout`)
    .then(response => response.data);
    console.log("hi, i'm in logoutUser action creater");
    return {
        type: LOGOUT_USER,
        payload: request
    }
};


export function auth(){
    const request = axios.get('/api/users/auth').then(response => response.data);

    return {
        type:AUTHEN_USER,
        payload: request
    }
}

