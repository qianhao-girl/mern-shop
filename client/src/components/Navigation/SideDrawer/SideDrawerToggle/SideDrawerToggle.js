import React from 'react';
import { FaAlignJustify} from 'react-icons/fa';
import classes from './SideDrawerToggle.module.css';


export default function SideDrawerToggle(props){
    return (
        <div className={classes.SideDrawerToggle} onClick={props.clicked}>
            <FaAlignJustify size={24} />
        </div>
    );
}
