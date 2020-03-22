import React,{ useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from "../../store/actions/user_actions";
import { useDispatch } from 'react-redux';

export default function(PageComponent, accessPermission, isAdminRoute = null){

    function Auth(props){
        // console.log("hoc Auth.props", props);
        const dispatch = useDispatch();

        useEffect(()=>{
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#Description
            dispatch(auth()).then(async response =>{
                // console.log("payload",response.payload);
                let isAuth = await response.payload.isAuth;
                if(!isAuth){
                    if(accessPermission){
                        // console.log("push to home 1 in hoc auth");
                        props.history.push("/login");
                    }
                }else{
                    if(accessPermission === false || (isAdminRoute && !response.payload.isAdmin)){
                        // console.log("push to home 2  in hoc auth");
                        props.history.push('/');
                    }
                }
            });   
        }, [dispatch, props.history]);

        return <PageComponent {...props} /> 
    }
    return withRouter(Auth);
}