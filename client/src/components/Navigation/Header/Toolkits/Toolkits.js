import React from 'react';
import { FaRegUser, FaRegBell, FaSearch } from 'react-icons/fa';
// import { IoIosSearch } from "react-icons/io";
import classes from './Toolkits.module.css';

export default function Tookits(props){
    let icon_size = 24;
    return (
        <div className={classes.Toolkits}>
            <div className={classes.Tool}>
                <FaSearch size={icon_size}/>
            </div>
            <div className={classes.Tool}>
                <FaRegBell size={icon_size}/>
            </div>
            <div className={classes.Tool}>
                <FaRegUser size={icon_size}/>
            </div>           
        </div>
    );
}