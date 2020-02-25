import React,{ useState } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import axios from 'axios';
import { shallowEqual ,useSelector } from 'react-redux';
import { FaRegUser, FaRegBell, FaSearch} from 'react-icons/fa';

import ToolDrapdowns from './ToolDropdowns/ToolDropdowns';

import classes from './Toolkits.module.css';

function Tookits(props){
    // console.log("Tookits.props: ",props);
    const icon_size = 24;
    let islogedIn = useSelector(state => !state.user.UserData? false: state.user.UserData.isAuth, shallowEqual);
    // console.log("isLogedin",islogedIn);
    const [showDropdown, setShowDropdown] = useState(false);
    // const [isLogedin, setisLogedin] = useState(logedIn);
    // console.log("isLogedin",isLogedin);
    const menuItemClickHandle = (event) => {
        setShowDropdown(!showDropdown);
    }
   
    const logoutHandler = (event) => {
        console.log("inside logoutHandle");
        axios.get("/api/users/logout").then(response => {
            if(response.status === 200){
                setShowDropdown(false);
                // setisLogedin(false);
                // console.log("back to home page in action in logoutHandler");
                props.history.push('/');
            }
        })
    }

    return (
        <div className={classes.Toolkits}>
            <div className={classes.Tool}>
                <FaSearch size={icon_size} onClick={menuItemClickHandle}/>
            </div>
            <div className={classes.Tool}>
                <FaRegBell size={icon_size} onClick={menuItemClickHandle}/>
            </div>
            { islogedIn? 
                (
                    <div className={classes.Tool}>
                        <FaRegUser size={icon_size} onClick={menuItemClickHandle}/>
                    </div>
                )
                : (
                    <div className={classes.Logs}>
                    <NavLink to="/login" className={classes.NavLink}>
                        sign in
                    </NavLink>
                    <NavLink to="/register" className={classes.NavLink}>sign up</NavLink>
                </div>
                )
            } 
            <ToolDrapdowns show={ showDropdown } logoutClicked={logoutHandler}/>       
        </div>
    );
}

export default withRouter(Tookits);

