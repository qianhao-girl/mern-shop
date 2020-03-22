import { REGISTER_USER,LOGIN_USER, LOGOUT_USER, AUTHEN_USER
, ADD_TO_CART_USER, REMOVE_FROM_CART, GET_CART_ITEMS_DETAILS_USER} from '../actions/types';

export default function (state={}, action){
    switch(action.type){
        case REGISTER_USER: 
            return {...state, register: action.payload}
        case AUTHEN_USER:
            return {...state, UserData: action.payload}
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload.loginSuccess}
        case LOGOUT_USER:
            return  {...state, UserData: null}
        case ADD_TO_CART_USER: 
            return {
                ...state, UserData: {
                    ...state.UserData,
                    cart: action.payload.cart,
            }}
        case REMOVE_FROM_CART:
            return {
                ...state, UserData: {
                    ...state.UserData,
                    cart: action.payload.cart
            }}
        case GET_CART_ITEMS_DETAILS_USER:
            return {
                ...state, 
                cartDetail: action.payload
            }
        default: 
            return state;
    }
}