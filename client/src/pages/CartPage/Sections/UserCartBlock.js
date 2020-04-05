import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, reverseCheckFromCart } from '../../../store/actions/index';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import soldoutImage from '../../../assets/images/soldout.png';
import  './UserCartBlock.css';

function UserCartBlock(props) {

    // const [Rerender, setRerender] = useState(false);
    const dispatch = useDispatch();
    const [Products, setProducts] = useState([]); //products groupBy WriterId,formation:
    //[Map{ writerId: [productObject1, productObject,...]},...]
    const [Total,setTatol] = useState("");
    //effects scheduled with useEffect don’t block the browser from updating the screen.
    useEffect(() => {
        async function getProducts(){
            if(props.products && props.products.length>0){
                let newProducts = [];
                await props.products.reduceRight((accu, currentValue) => {
                    if(newProducts.length<=0){
                        newProducts.push(
                            new Map([ [currentValue.writer._id, [{...currentValue}] ] ]));
                    }else{
                        let groupExists = false;
                        for(let index in newProducts){
                            if(newProducts[index].has(currentValue.writer._id)){
                                newProducts[index].get(currentValue.writer._id).push({...currentValue});
                                groupExists = true;
                                break;
                            }
                        }
                        if(!groupExists){
                            newProducts.push(new Map([ [currentValue.writer._id, [{...currentValue}]] ]))
                        }
                    }
                    return accu && currentValue;//in case that the optimization in the blackbox skip groupBy operation
                },true);
                if(newProducts.length > 0){
                    console.log("newProducts: ", newProducts);
                    setProducts(newProducts);
                }
            }
        }

        getProducts();
    },[props.products]);

    // const removeItemFromCart = (productId) => {
    //     dispatch(removeFromCart(productId)).then(
    //         () => {
    //             console.log("hhhh")
    //         }
    //     );
    // };

    const reverseCheckItem = (productId) => {
        dispatch(reverseCheckFromCart(productId))
    }
    

    const IncrementQuantity = (productId) => {
        dispatch(addToCart(productId));
    }



    const renderItemsInShop = (index) => {    
         //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
        let writerId =  Products[index].keys().next().value; 
        let products = Products[index].get(writerId).map((item,index) => {
            return (              
                <div className="product-item" key={index}>
                    <div className={classNames("cell", "good-cell")}>
                            <div className="good">
                                <div className="label">
                                    <input type="checkbox" className="checkbox" checked={item.checked} onChange={() => reverseCheckItem(item._id)}/>
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
                            <button className='quantity-minus'>-</button>
                            <input type='number' value={item.quantity} ></input>
                            <button className='quantity-plus' onClick={() => IncrementQuantity(item._id)}>+</button>
                        </div>
                    </div>
                    <div className={classNames("cell", "handle-cell")}>
                        <div>delete</div>
                        <div>move to wishlist</div>
                    </div>  
                </div>
            )
        });
        return products;    
    }


    //merchant,price,quantity,price*quantity, delete or move to wishlist
    const renderCartItemsByShop = () => Products && Products.map((shop,index) =>
        <div className="shop-wrapper" key={index}>
            <div className="shop-item">
                <div>
                    <label>
                        <input type="checkbox"></input>
                        <div>
                            <p>{shop.keys().next().value}</p>
                        </div>
                    </label>
                </div>
            </div>
            {renderItemsInShop(index)}
        </div>
    )

    const isCheckedAllInShop = (writerId) => {

    }

    const checkAllItemsInShop = (writerId) => {

    }

    const calculateTotal = (products) => {
        products.reduce((accu,shop) => {
            shop.values().next().value.forEach(product =>{
                if(product.checked){
                    accu += product.price * product.quantity;
                }
            });
            return accu;
        },0.0)
    }

    const updateQuantityValue = (writerId, productId, value) => {
        let currentIndex = -1;
        let productIndex = -1;
        for(let index in Products){
            if(Products[index].keys().next().value === writerId){
                currentIndex = index;
            }  
        }
        if(currentIndex<0) {return};
        productIndex  =  Products[currentIndex].get(writerId).indexOf((item) => item._id === productId);
        if(productIndex > 0){ 
            let newProducts  = [...Products]; //,array of maps, which point to the same map in the old Products
            let inc = value - Products[currentIndex].get(writerId)[productIndex].quantity;
            newProducts[currentIndex].get(writerId)[productIndex].quantity = value;
            setProducts(newProducts); //update value in component before update it in the backend,
            //!!! be mind backend update might fail, so frontend value would be unlegitimate
            //TODO: update backend
            dispatch(addToCart(productId, inc));
        }       
    }
   
    //unefficienct,because when user intened to input 17, 1 and 17 would be sended back to backend seperately,
    //notheless we only want send 17 to backend
    const onQuantityInputChangeHandlerCreator = (writerId, productId) => {
        return (event) => {
            let quantity = parseInt(event.currentTarget.value,10); 
            updateQuantityValue(writerId, productId, quantity);   
        }
    }


    
    const onQuantityIncrementClickHandlerCreator = (writerId, productId, inc) => {//inc in [-1,1]
        return (event) => {
            let currentIndex = -1;
            let productIndex = -1;
            for(let index in Products){
                if(Products[index].keys().next().value === writerId){
                    currentIndex = index;
                }  
            }
            if(currentIndex<0) {return};
            productIndex  =  Products[currentIndex].get(writerId).indexOf((item) => item._id === productId);
            if(productIndex > 0){
                let newProducts  = [...Products];
                newProducts[currentIndex].get(writerId)[productIndex].quantity += inc;
                setProducts(newProducts); //update value in component
                //TODO: update backend
                if(inc===1){
                    dispatch(addToCart(productId));
                }
                // if(inc===-1){
                //     dispatch(removeFromCart(productId));
                // }
            }                         
        }
    }
        
    return (
        <div className="cart-main">
            <div className="cart-list">
                <div className="list-head">
                    <div className="selectall-head-cell">
                        <input type="checkbox" className="select-check"></input>
                    </div>
                    <div className="price-head-cell"> Price</div>
                    <div className="quantity-head-cell">quantity</div>
                </div>
                <div className="list-main">
                    {renderCartItemsByShop()}
                </div> 
            </div>
            <div className="cart-fixed">
                <div>delete</div>
                <div>clear cart</div>
                <div>
                    subtitle
                </div>
                <Link to="" className="checkout-btn"></Link>
            </div> 
        </div>    			
    )
}

export default UserCartBlock;

//The word lexical refers to the fact that lexical scoping
// uses the location where a variable is declared within the source code
// to determine where that variable is available.

//An arrow function does not have its own this. 
//The this value of the enclosing lexical scope is used; 
//arrow functions follow the normal variable lookup rules.
// So while searching for `this` which is not present in current scope, 
//an arrow function ends up finding the this from its enclosing scope.

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_arguments
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Invoked_through_call_or_apply
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#As_an_object_method