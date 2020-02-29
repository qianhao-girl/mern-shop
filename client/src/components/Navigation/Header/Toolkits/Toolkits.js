import React,{ useState } from 'react';
import { NavLink, Link, withRouter} from "react-router-dom";
import axios from 'axios';
import { connect} from 'react-redux';
import { FaRegUser, FaRegBell, FaSearch, FaUpload} from 'react-icons/fa';

import ToolDrapdowns from './ToolDropdowns/ToolDropdowns';

import classes from './Toolkits.module.css';

function Tookits(props){
    const icon_size = 24;
   
    const [showDropdown, setShowDropdown] = useState(false);


    const menuItemClickHandle = (event) => {
        setShowDropdown(!showDropdown);
    }
   
    const logoutHandler = (event) => {
        // console.log("inside logoutHandle");
        axios.get("/api/users/logout").then(response => {
            if(response.status === 200){
                setShowDropdown(false);
                console.log("logoutHandler",props)

                props.history.push('/');
            }
        })
    }

    return (
        <div className={classes.Toolkits}>
            <div className={classes.Tool}>
                <FaSearch size={icon_size} onClick={menuItemClickHandle}/>
            </div>
            {props.isAuth?
                <div className={classes.Tool}>
                    <Link to="/product/upload">
                        <FaUpload size={icon_size} color={"black"}/>
                    </Link>
                </div>
                : null
            }
            <div className={classes.Tool}>
                <FaRegBell size={icon_size} onClick={menuItemClickHandle}/>
            </div>
            { props.isAuth? 
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

const mapStateToProps = state => {
    return {
        isAuth: state.user.UserData && state.user.UserData.isAuth,
        isAdmin: state.user.UserData && state.user.UserData.isAdmin,
    }
}

export default withRouter(connect(mapStateToProps)(Tookits));

