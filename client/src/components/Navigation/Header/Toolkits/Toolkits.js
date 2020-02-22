import React,{ useState } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FaRegUser, FaRegBell, FaSearch} from 'react-icons/fa';

import ToolDrapdowns from './ToolDropdowns/ToolDropdowns';

import classes from './Toolkits.module.css';

export default function Tookits(props){
    let icon_size = 24;
    const [showDropdown, setShowDropdown] = useState(false);
    
    const itemClickHandle = (event) => {
        setShowDropdown(!showDropdown);
    }

    let user = useSelector(state => state.user);
    // let isAuth = true;

    let isAuth = user.UserData ? user.UserData.isAuth : false;
    let accountLinks = isAuth? (
        <div className={classes.Tool}>
                <FaRegUser size={icon_size} onClick={itemClickHandle}/>
        </div>
    ) : (<div className={classes.Logs}>
            <NavLink to="/login" className={classes.NavLink}>
                sign in
            </NavLink>
            <NavLink to="/register" className={classes.NavLink}>sign up</NavLink>
        </div>)

    return (
        <div className={classes.Toolkits}>
            <div className={classes.Tool}>
                <FaSearch size={icon_size}/>
            </div>
            <div className={classes.Tool}>
                <FaRegBell size={icon_size}/>
            </div>
            {accountLinks} 
            <ToolDrapdowns show={ showDropdown }/>       
        </div>
    );
}