import React,{ useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../../store/actions/index';
import ProductImage from './Sections/ProductImages';
import './SingleProductPage.css';

function SingleProductPage(props) {
    const productId = props.match.params.productId;
    const [Product, setProduct] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/api/product/product_by_id?id=${productId}&type=single`).then(
            response => {
                setProduct(response.data[0]);
            }
        )
    }, [])

    const addToCartHandler = (productId) => {
        dispatch(addToCart(productId));
    }




    return (
        <div>
            <h1>{Product.title}</h1>
            <ProductImage details={Product}/> 
            <div>
                <button onClick={() => addToCartHandler(Product._id)}>add to cart</button> 
                <button>buy it now</button> 
            </div>        
        </div>
    )
}

export default SingleProductPage;
