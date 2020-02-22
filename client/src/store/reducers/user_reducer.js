import { LOGIN_USER, LOGOUT_USER, AUTHEN_USER} from '../actions/types';

export default function (state={}, action){
    switch(action.type){
        case AUTHEN_USER:
            return {...state, UserData: action.payload}
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload.loginSuccess}
        case LOGOUT_USER:
            return  {...state, UserData: null}
        default: 
            return state;
    }
}