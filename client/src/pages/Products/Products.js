import React,{ useState, useEffect} from 'react';
import axios from 'axios';;
import classes from './Products.module.css'

function Products(props) {

    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [size, setSize] = useState(0);

    useEffect(() => getProducts({skip,limit}), []);

    const onLoadMore = (event) => {
        let skip = skip + limit;
        getProducts({ skip, limit}, true);
    }

    const getProducts = (args, concat=true) => {
        axios.post('/api/products/getProducts',args).then(response => {
            if(response.data.success){
                concat? setProducts([...products,response.data.products]) : setProducts(response.data.products);
                setSize(response.data.amount);
            }else{
                alert('failed to fetch products');
            }
        });
    }


    return (
        <div className={classes.Showcase}>
            {
                products.map((product,index) => {
                    return (
                        <div key={index} className={classes.Cubicle}>
                            <img src={`http//localhost:5000/${product.images[0]}`} alt={`productImg-${index}`}/>
                            <p>{`price: $${product.price}`}</p>
                            <p>{product.description}</p>
                        </div>
                    )
                })
            }
            {size >= limit && <button onClick={ onLoadMore }>Load More</button>}
        </div>
    )
}

export default Products
