import React from 'react'
import { Redirect } from 'react-router-dom';
import { useDispatch} from 'react-redux'
import { logoutUser } from '../../../store/actions/user_actions'
export default function Logout() {
    useDispatch()(logoutUser());   
    return <Redirect to="/"></Redirect>
}