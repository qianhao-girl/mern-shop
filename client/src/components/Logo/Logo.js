import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const Logo = (props) => {
    return(
        
        <NavLink to="/">
            <div className={classes.Logo} style={{height: props.height}}>
                <img src={ logo } alt="" style={{height: props.height}}/>
            </div>
        </NavLink>
    )    
 }
 export default Logo;