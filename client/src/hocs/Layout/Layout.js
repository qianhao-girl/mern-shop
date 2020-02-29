import React,{ Component } from 'react';
import Header from '../../components/Navigation/Header/Header';
import Modal from '../../components/utils/Modal/Modal';
import LeftSideDrawer from '../../components/Navigation/SideDrawer/LeftSideDrawer';
import classes from './Layout.module.css';



export default class Layout extends Component{

    state = {
        showSideDrawer: false,
    };

    sideDrawerToggler = () =>{
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    modalClickHandle = (event) => {
        this.sideDrawerToggler(); 
    }
    render(){
        return(
            <>
                <div className={classes.Header}>
                    <Header 
                        toggleSideDrawer={this.sideDrawerToggler}/>
                </div>
                <div>
                    <LeftSideDrawer 
                        toggleSideDrawer = {this.sideDrawerToggler}
                        show={this.state.showSideDrawer}/>
                    <Modal show={this.state.showSideDrawer} closeModal={this.modalClickHandle }/>
                </div>
                <main className={classes.Main}>{this.props.children}</main>
            </>             
        );  
    }
}