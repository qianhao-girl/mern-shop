import React from 'react';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToolKits from './Toolkits/Toolkits';
import classes from './Header.module.css';

export default function Header(props){
    return(
        <>
            <header className={classes.Header}>
                <div className={classes.Start}>
                    <div className={classes.SideDrawerToggleContainer}>
                        <SideDrawerToggle clicked={props.toggleSideDrawer} />
                    </div>
                    <div className={classes.LogoContainer}>
                        <Logo height="40px"/>
                    </div>                
                </div>
                <nav className={classes.Nav}>
                    <NavigationItems />
                </nav>
                <div className={classes.End} >
                    <ToolKits />
                </div>
            </header>
        </>        
    )
}