import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './ToolDropdowns.module.css'

export default function ToolDropdowns(props) {
    let show = props.show ? classes.Showing: '';

    return (
        <div className={`${classes.multiPageMenuRender} ${show}`}  >
            <div>
                <NavLink to="/register" style={{textDecoration: "none", textTransform: "capitalize"}}>Sign Up</NavLink>
            </div>
            <div onClick={props.logoutClicked}>
                <NavLink to="/logout" style={{textDecoration: "none", textTransform: "capitalize"}}>Logout</NavLink>
            </div>
        </div>
    );
}
