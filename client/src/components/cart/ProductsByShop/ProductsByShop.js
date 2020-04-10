import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
    addToCart, removeFromCart, setQuantityFromCart,
    deleteItemFromCart, reverseCheckFromCart
} from '../../../store/actions/index';
import classNames from 'classnames';
import soldoutImage from '../../../assets/images/soldout.png';

function ProductsByShop(props){
    const dispatch = useDispatch();
    // const [Products, setProducts] = useState([]);
    // const [WriterId, setWriterId] = useState('');
    const [SelectAll, setSelectAll] = useState(false);
    
    useEffect(() => {
        if(props.products && props.shopId){
            if(props.products.every((product) => product.checked)){
                if(SelectAll === false){
                    console.log("it's about to SetSelectAll to all in a shop");
                    setSelectAll(true);
                }
            }else{
                console.log("it's about to SetSelectAll to false in a shop");
                if(SelectAll === true) setSelectAll(false);
            }
            
        }
    },[props.products, props.shopId]); 

    // useEffect(() => {
    //     if(WriterId){
    //         console.log("it's about to SetProducts in one shop");
    //         setProducts(props.products.get(WriterId));
    //     }
    // },[WriterId]); //setProducts
    // useEffect(() => {
    //     if(Products){
    //         if(Products.every((product) => product.checked)){
    //             if(SelectAll === false){
    //                 console.log("it's about to SetSelectAll in one shop");
    //                 setSelectAll(true);
    //             }
    //         }else{
    //             console.log("it's about to SetSelectAll in one shop");
    //             if(SelectAll === true) setSelectAll(false);
    //         }
    //     }
    // },[Products]); //setSelectAll

    const reverseSelectAll = (products,selectAll) => {
        let productIds = [];
        if(products){
            products.forEach((product) => {
                if(product.checked == selectAll){
                    productIds.push(product._id);
                }
            });
        }
        if(productIds.length > 0){
            dispatch(reverseCheckFromCart(productIds))
        }
    }

    const reverseChecked = (productId) => {
        dispatch(reverseCheckFromCart(productId));
    }

    const incrementQuantity = (productId) => {
        dispatch(addToCart(productId));
    }
    const decrementQuantity = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const quantityInputValueChangeHandler = (productId, event) => {
        let quantity = event.target.value;
        if(quantity>=0){
            dispatch(setQuantityFromCart(productId, quantity))
        }
    }

    const deleteItem = (productId) => {
        dispatch(deleteItemFromCart(productId));
    }


    
    //@parameter Products: [ProductObjectFromReduxStore] 
    const renderItemsInShop = () => {    
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
        let products = props.products.map((item,index) => {
            return (              
                <div className="product-item" key={index}>
                   <div className={classNames("cell", "good-cell")}>
                            <div className="good">
                                <div className="label">
                                   <input type="checkbox" className="checkbox" 
                                    checked={item.checked}
                                    onChange={() => reverseChecked(item._id)}
                                   />
                               </div>
                               <div className="good-info">
                                    <Link to={`/product/${item._id}`} className="img-container">
                                       <img src={`http://localhost:5000/${item.images[0]}`}></img>
                                       {item.stock <= 0 ? <img src={ soldoutImage } className="img-soldout"/> : null}
                                    </Link>
                                    <div className="good-detail">
                                        <div className="titile">description</div>
                                        <div className="attr">
                                           pick a feature
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className={classNames("cell", "price-cell")}>
                       <p>{`$${item.price}`}</p>
                    </div>
                    <div className={classNames("cell", 'quantity-cell')}>
                        <div className="quantity-console">
                            <button className='quantity-minus'
                              onClick={() => decrementQuantity(item._id)}>-</button>
                            <input type='number' value={item.quantity} 
                              onChange={(event) => quantityInputValueChangeHandler(item._id,event) }
                            />
                           <button className='quantity-plus'
                              onClick={() => incrementQuantity(item._id)}>+</button>
                        </div>
                    </div>
                    <div className={classNames("cell", "handle-cell")}>
                        <div onClick={() => deleteItem(item._id)}>delete</div>
                        <div>move to wishlist</div>
                    </div>  
                </div>
            )
        });
       return products;    
   }


    if(!props.shopId){
       return null;
    }else{
        return(
            <div className="shop-wrapper">
                <div className="shop-item">
                    <div className="shop">
                        <label>
                            <input type="checkbox"
                              className="checkall"
                              checked={SelectAll}
                              onChange={() => reverseSelectAll(props.products, SelectAll)}
                              ></input>
                            <div>
                                <p>{props.shopId}</p>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="shop-main">
                    {props.products? renderItemsInShop() : <p>loading</p>}
                </div>                
            </div>
        )
    }
}

export default ProductsByShop;