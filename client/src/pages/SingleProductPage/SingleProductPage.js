import React,{ useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../../store/actions/index';
import ProductImage from './Sections/ProductImages';
import Comments from '../../components/utils/Comments/Comments';
import './SingleProductPage.css';

function SingleProductPage(props) {
    const productId = props.match.params.productId;
    const dispatch = useDispatch();
    const [Product, setProduct] = useState({});
    const [CommentLists, setCommentLists] = useState([]);
    

    useEffect(() => {
        axios.get(`/api/product/product_by_id?id=${productId}&type=single`).then(
            response => {
                setProduct(response.data[0]);
            }
        );

        axios.get(`/api/product/getComments?id=${productId}`).then(response => {
            if(response.data.success){
                setCommentLists(response.data.comments);
            }else{
                console.log(response.data.err);
            }
        });
    }, []);

    const addToCartHandler = (productId) => {
        dispatch(addToCart(productId));
    };

    const updateComments = (newComment) => {
        setCommentLists(CommentLists.concat(newComment));
    };

    return (
        <div className="singleProduct-main">
            <div className="w" >
                <div className="preview" >
                    <ProductImage details={Product}/>
                </div>                
                <div className="summary">
                    <h1>{Product.title}</h1>
                    <h2>{`$${Product.price}`}</h2>
                    <div className="choose-btns">
                        <button 
                            className="addToCart-btn"
                            onClick={() => addToCartHandler(Product._id)}>add to cart</button> 
                        <button
                            className="buyItNow-btn" >
                            buy it now
                        </button> 
                    </div> 
                </div>           
            </div>
            { console.log(CommentLists)}
            <Comments 
                commentLists={ CommentLists }
                postId={ productId }
                refreshFunction={ updateComments }
            />
        </div>       
    )
}

export default SingleProductPage;
