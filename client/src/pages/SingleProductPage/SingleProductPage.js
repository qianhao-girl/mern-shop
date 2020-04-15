import React,{ useState, useEffect, useRef} from 'react';
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
    const DetailTabRef = useRef(null);
    
    useEffect(() => {       
        window.onscroll = stickToTop;       
        return () => {
            window.onscroll = null;
        }
    }, []);

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

    const stickToTop = () => {
        let anchor = document.getElementsByClassName("detail-tab")[0];
        let elem = document.getElementById("is-sticky");
        let d1 = window.pageYOffset;
        let d2 = anchor.offsetTop;
        if(d1 >= d2 - 4){
            console.log("stick to top condition just meeted");
            elem.classList.remove("sp-head");
            elem.classList.add("fixed");
        }else{
           elem.classList.remove("fixed");
           elem.classList.add("sp-head");
        }
        console.log("d1: ",d1,"d2: ",d2);
    }

    const addToCartHandler = (productId) => {
        dispatch(addToCart(productId));
    };

    const updateComments = (newComment) => {
        setCommentLists(CommentLists.concat(newComment));
    };

    return (
        <>
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
            {/* { console.log(CommentLists)} */}
            <div className="w">
                <h2>About the Product</h2>
                <div className="detail-tab" ref={DetailTabRef}>
                    <ul id="is-sticky" className="sp-head" style={{listStyle: "none"}}>
                        <li>
                            <a href="#">Specification</a>                            
                        </li>
                        <li>
                            <a href="#">Details</a>                            
                        </li>
                        <li>
                            <a href="#reviews">Reviews</a>
                        </li>
                        <li className="sp-more">
                            <button className="is-large" onClick={() => addToCartHandler(Product._id)}>Add to Cart</button>
                        </li>                    
                    </ul>                    
                </div>
                <div className="details">
                    <Comments id="reviews"
                        commentLists={ CommentLists }
                        postId={ productId }
                        refreshFunction={ updateComments }
                     />
                </div>
            </div>
        </>       
    )
}

export default SingleProductPage;
