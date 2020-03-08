import React,{ useState } from 'react';
import { connect, useSelector } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

function NavigationItems(props){
    // const user = useSelector(state => state.user);
    // const [isAdmin, setIsAdmin] = useState(user.UserData? user.UserData.isAdmin : false);
    // const [isAuth, setIsAuth] = useState(user.UserData? user.UserData.isAuth : false);


    return (
        <ul className={classes.NavigationItems}>   
            <NavigationItem link="/" exact>Home</NavigationItem>        
            <NavigationItem link='/products'>Products</NavigationItem>  
            <NavigationItem link='/about'>Shops</NavigationItem>
            {props.isAuth? 
                (<>
                    <NavigationItem link='/../carts'>Carts</NavigationItem>
                    <NavigationItem link='/../orders'>Orders</NavigationItem>
                </>)
                : null
            }
            {props.isAdmin? (
                    <NavigationItem link='/admin'>Admin Products</NavigationItem>
                )
                :
                null
            }
        </ul>
    );  
}

const mapStateToProps = state => {
    return  {
        isAuth: state.user.UserData && state.user.UserData.isAuth,
        isAdmin: state.user.UserData && state.user.UserData.isAdmin,
    }
}

export default connect(mapStateToProps)(NavigationItems);