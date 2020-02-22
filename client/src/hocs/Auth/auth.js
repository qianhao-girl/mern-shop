import React,{ useEffect} from 'react';
import { auth } from "../../store/actions/user_actions";
import { useSelector, useDispatch } from 'react-redux';

export default function(PageComponent, accessPermission){

    function Auth(props){
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch(auth()).then(response =>{
                if(!response.payload.isAuth){
                    if(accessPermission){
                        props.history.push("/");
                    }
                }else{
                    if(accessPermission === false){
                        props.history.push('/');
                    }
                }
            });   
        }, []);

        return <PageComponent {...props} user={user} /> 
    }

    return Auth;
}