import React,{ useEffect} from 'react';
import { withRouter } from 'react-router-dom';
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
                        console.log("push to home 1");
                        props.history.push("/");
                    }
                }else{
                    if(accessPermission === false){
                        console.log("push to home 2");
                        props.history.push('/');
                    }
                }
            });   
        }, []);

        return <PageComponent {...props} user={user} /> 
    }
    return withRouter(Auth);
}