import React,{ useState } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaRegUser, FaRegBell, FaSearch} from 'react-icons/fa';

import ToolDrapdowns from './ToolDropdowns/ToolDropdowns';

import classes from './Toolkits.module.css';

function Tookits(props){
    const icon_size = 24;
    let user = useSelector(state => state.user);
    let isAuth = (user && user.isAuth)? user.isAuth: true;

    const [showDropdown, setShowDropdown] = useState(false);
    const [isLogedin, setisLogedin] = useState(isAuth);
    
    const itemClickHandle = (event) => {
        setShowDropdown(!showDropdown);
    }

    const logoutHandler = (event) => {
        setShowDropdown(false);
        setisLogedin(false);
        axios.get("/api/users/logout").then(response => {
            if(response.status === 200){
                setisLogedin(false);
                props.history.push('/');
            }
        })
    }

    return (
        <div className={classes.Toolkits}>
            <div className={classes.Tool}>
                <FaSearch size={icon_size}/>
            </div>
            <div className={classes.Tool}>
                <FaRegBell size={icon_size}/>
            </div>
            { isLogedin? 
                (
                    <div className={classes.Tool}>
                        <FaRegUser size={icon_size} onClick={itemClickHandle}/>
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

