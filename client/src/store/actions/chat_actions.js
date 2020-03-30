import Axios from 'axios';
import { CHAT_SERVER } from '../../config';

import {
    GET_CHATS,
} from './types';

export function getChats(chatRoomId){   
    const request = axios.get(`${CHAT_SERVER}/getChats/?roomId=${chatRoomId}`)
        .then(response => {
            return response.data;
        });

    return {
        type: GET_CHATS,
        payload: request,
    }
}


