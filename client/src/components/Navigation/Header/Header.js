import React from 'react';
import { useSelector, connect } from 'react-redux';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToolKits from './Toolkits/Toolkits';
import classes from './Header.module.css';

export default function Header(props){
    // const [loginSuccess, setloginSuccess] = useState(false);
    // let user = useSelector(state => state.user);
    // if(user.loginSuccess && user.loginSuccess != loginSuccess) setloginSuccess(loginSuccess);
    
    // logoutClickHandle = (event) => {
    //     if(user.loginSuccess && user.loginSuccess != loginSuccess) 
    //         setloginSuccess(loginSuccess);
    // }

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