import axios from 'axios';
import { USER_SERVER } from '../../config';

import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
    AUTHEN_USER,
    ADD_TO_CART_USER,
    REMOVE_FROM_CART_USER,
    REVERSE_CHECK_FROM_CART_USER,
    SET_QUANTITY_FROM_CART_USER,
    GET_CART_ITEMS_DETAILS_USER,
    DELETE_ITEM_FROM_CART_USER,
} from './types';


export function registerUser(dataToSubmit){
    // console.log("hi, i'm in registerUser action creater");
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => {return response.data})
        .catch(err =>{return err;});
    return{
        type:REGISTER_USER,
        payload: request,
    }
}

export function loginUser(dataToSubmit){
    // console.log("hi, i'm in loginUser action creater");
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
        .then(response => response.data);
    ;
    return{
        type: LOGIN_USER,
        payload: request
    }
}

export function logoutUser(){
    // console.log("hi, i'm in logoutUser action creater");
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);
    return {
        type: LOGOUT_USER,
        payload: request
    }
};


export function auth(){
    // console.log("hi, i'm in auth action creater");
    const request = axios.get(`${USER_SERVER}/auth`).then(response => {
        console.log("auth's response: ",response)
        return response.data
    });

    return {
        type:AUTHEN_USER,
        payload: request
    }
}


export function addToCart(_id, addNum=1){
    const request = axios.get(`${USER_SERVER}/cart/addToCart?productId=${_id}&amount=${addNum}`).then(
        response => response.data
    );

    return{
        type: ADD_TO_CART_USER,
        payload: request,
    }

}


export function removeFromCart(productId){
        
    const request = axios.get(`${USER_SERVER}/cart/removeFromCart?id=${productId}`).then(
        response => response.data
    );

    return {
        type: REMOVE_FROM_CART_USER,
        payload: request,
    }
}

export function deleteItemFromCart(productId){
    let type = Array.isArray(productId)? "array": "single";
    const request = axios.get(`${USER_SERVER}/cart/deleteItemFromCart?id=${productId}&type=${type}`).then(
        response => response.data
    );

    return {
        type: DELETE_ITEM_FROM_CART_USER,
        payload: request,
    }
}

export function setQuantityFromCart(productId, quantity){
    const request = axios.get(`${USER_SERVER}/cart/setQuantityFromCart?id=${productId}&amount=${quantity}`).then(
        response => response.data
    );

    return {
        type: SET_QUANTITY_FROM_CART_USER,
        payload: request,
    }

}

export function reverseCheckFromCart(productId){
    let type = Array.isArray(productId)? "array" : "single";    
    const request = axios.get(`${USER_SERVER}/cart/reverseCheckFromCart?id=${productId}&type=${type}`).then(
        response => response.data
    );

    return {
        type: REVERSE_CHECK_FROM_CART_USER,
        payload: request,
    }
}


export function getCartItemsDetails(productIds, userCartItems){
    const request = axios.get(`/api/product/product_by_id?id=${productIds}&type=array`).then(
        response => {
            userCartItems.forEach(cartItem => {
                response.data.forEach((product, index) => {
                    if(product._id === cartItem.productId){
                        response.data[index].quantity = cartItem.quantity;
                        response.data[index].checked = cartItem.checked;  
                    }
                })
            })
            return response.data;            
        }
    )
    return {
        type: GET_CART_ITEMS_DETAILS_USER,
        payload: request,
    }
}






