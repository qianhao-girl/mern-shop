import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Card.module.css';
import soldout from '../../../assets/images/soldout.png';

export default function Card(props) {
  return (
    <article className={classes.Card}>
      <Link to={props.link} className={classes.Back}>
        <div className={classes.ImgContainer}>
          <img src={props.image} alt="product-img" />
          {props.soldout? (
            <div className={classes.Soldout}>
              <img src={soldout} alt="sold out"></img>     
            </div>        
            ):null          
          }
        </div>
        <div className={classes.Info}> 
          <p>US$ {props.price}</p>
        </div>   
      </Link>
      <Link to={props.link} className={classes.Fore}>
        <div>{props.description}</div>
      </Link>
    </article>
    )
}
