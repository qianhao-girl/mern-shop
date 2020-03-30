import {
    GET_CHATS,
} from '../actions/types';

export default function (state={}, action){
    switch(action.type){
        case GET_CHATS: return {
            ...state,
            chats: action.payload,

        }
        default: return state;
    }

}