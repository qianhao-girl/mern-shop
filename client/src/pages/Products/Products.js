import React,{ useState, useEffect} from 'react';
import axios from 'axios';

import classes from './Products.module.css';

import { price } from './Sections/Data';
import RadioBox from './Sections/RadioBox/RadioBox';
import Search from './Sections/Search';
import Card from '../../components/utils/Card/Card';
import MiniSidebar from '../../components/Navigation/MiniSidebar/MiniSidebar';

function Products(props) {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [Size, setSize] = useState(0);
    const [Filters,setFilters] = useState({
        price: [],
    });
    const [SearchTerm, setSearchTerm] = useState('');

    useEffect(() => getProducts({skip: Skip, limit: Limit}), []);

    const onLoadMore = () => {
        let skip = Skip + Limit;
        let limit = Limit;
        getProducts({ skip, limit}, true);
        setSkip(skip);
    };

    
    const showFilterResult = (filters) => {
        getProducts({ skip: 0, limit: Limit, filters: filters}, false);
        setSkip(0);  
    }

    const handlePriceChange = (value) => {
        const data = price;
        let array = [];
        for(let index in data) {
            if(index === parseInt(value,10)){
                array = data[index].array
            }
            break;
        }   
        return array;    
    }

    const handleFilterChange = (filters, category) => {
        const newFilters = {...Filters};
        newFilters[category] = filters;
        if(category==='price'){
            newFilters[category] = handlePriceChange(filters) ;           
        }
        showFilterResult(newFilters);
        setFilters(newFilters);
    }

    

    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
        setSkip(0);
        getProducts({
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        },false); 
    }; 


    const getProducts = (args, concat=true) => {
        axios.post('/api/product/getProducts',args).then(response => {
            if(response.data.success){
                concat? setProducts([...Products,...response.data.products]) : setProducts(response.data.products);
                setSize(response.data.amount);
            }else{
                alert('failed to fetch products');
            }
            console.log("gotproducts: ",response.data.products);
        });
    }

    
    return (
        <>
            <MiniSidebar />
            <div>
                <RadioBox name="price" list={price}  
                    handleFilterChange={filters => handleFilterChange(filters, 'price')}/>
                <Search report={ updateSearchTerm }/>
            </div>
            {Products.length === 0 ?
                <div>No Products yet</div>
            : 
                <div className={classes.Showcase}>
                    {Products.map((product,index) => {
                        // console.log("product : ",product);
                        return <Card key={index}
                            detail={product}
                            link={`/product/${product._id}`}
                            image={`http://localhost:5000/${product.images[0]}`}
                            soldout={product.stock <= 0}
                            price={product.price}
                            description={product.description}/>
                    })}
                </div>
            }
            {Size >= Limit && <button onClick={ onLoadMore }>Load More</button>}   
        </>
        
    )
}

export default Products

// {Products.map((product,index) => {
//     console.log("product : ",product);
//     return (
//         <div key={index}>
//             <img src={`http://localhost:5000/${product.images[0]}`} alt={`productImg-${index}`}/>
//             <p>{`price: $${product.price}`}</p>
//             <p>{product.description}</p>
//         </div>
// )
// })}