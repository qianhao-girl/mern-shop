import React,{ useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getCartItemsDetails,removeFromCart } from '../../store/actions/index';
import UserCartBlock from './Sections/UserCartBlock';


function CartPage(props) {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();
    // const [Total, setTotal] = useState(0);

    useEffect(() =>{
        if(user.UserData && user.UserData.cart.items){
            if(user.UserData.cart.items.length > 0){
                let productIdsInCart = [];
                user.UserData.cart.items.forEach(item => {
                    productIdsInCart.push(item.productId)
                })
                dispatch(getCartItemsDetails(productIdsInCart, user.UserData.cart.items))
            }
        }        
    }, [user.UserData]);

    // useEffect(() => {
    //     if(user.cartDetail && user.cartDetail.length>0){
    //         let total = calculateTotal(user.cartDetail);
    //         setTotal(total);
    //     }
    // },[user.cartDetail]);

    //TODO:
    // const removeShopFromCart = (writerId) => {

    // }

    // const removeItemFromCart = (productId) => {
    //     dispatch(removeFromCart(productId));
    // };


    // const calculateTotal = (products) => {
    //     let total = products.reduce((accu,product) => {
    //         if(product.checked){
    //             accu += product.price * product.quantity;
    //         }
    //         return accu;
    //     },0.0);
    //     return total;
    // };


    return (
        <div>
            <UserCartBlock products={user.cartDetail}/>            
        </div>
    )
}

export default CartPage
