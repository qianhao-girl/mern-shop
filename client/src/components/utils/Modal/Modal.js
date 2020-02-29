import React from 'react';
import classes from './Modal.module.css';

export default function Modal(props){
    return(
        <div className={classes.Modal}
          style={{ transform: props.show ? "translateX(0)" : "translateX(-100vw)" }}
          onClick={props.closeModal}>
            { props.children }        
        </div> 
    )       
}