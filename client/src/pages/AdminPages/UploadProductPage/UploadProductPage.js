import React,{ useState } from 'react';
import axios from 'axios';

import CountryList from '../../../assets/commonData/CountryList';
import classes from './UpLoadProductPage.module.css';
import FileUpload from '../../../components/utils/ImagesUpload/ImagesUpload'

export default function UpLoadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("");
    const [DescriptionValue, setDescriptionValue] = useState("");
    const [PriceValue, setPriceValue] = useState(0);
    const [CountryValue,setCountryValue] = useState(49);
    const [InventoryValue, setInventoryValue] = useState(0);
    const [Images,setImages] = useState([]);

    const onTitleChange = (event) =>{
        setTitleValue(event.currentTarget.value);
    }
    const onDescriptionChange = (event) =>{
        setDescriptionValue(event.currentTarget.value);
    }
    const onPriceChange = (event) =>{
        setPriceValue(event.currentTarget.value);
    }
    const onInventoryChange = (event) => {
        setInventoryValue(event.currentTarget.value);
    }
    const onCountryChange = (event) => {
        setCountryValue(event.currentTarget.value);
    }

    const updateImages = (newImages) => {
        setImages(newImages);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const dataToSubmit = {
            title: TitleValue,
            price: PriceValue,
            description: DescriptionValue,
            images: Images,
            stock: InventoryValue,
        }
        axios.post('/api/admin/add-product', dataToSubmit)
        .then(response => {
            if(response.data.success){
                setTimeout(props.history.push('/'), 1000)
            }else{
                alert("Fail to upload product");
            }
        });
    }

    return (
        <div className={classes.FormContainer}>
            <h1>Upload Your Product</h1>
            <form  className={classes.Form} onSubmit={onSubmit}>
                <div>
                    <FileUpload updateParentImages={updateImages}/>
                </div>
                <div  className={classes.FormControl}>
                    <label  className={classes.Label}>Title</label>
                    <input className={classes.Input} type="text" onChange={onTitleChange} value={TitleValue}/>
                </div>
                <div className={classes.FormControl}>
                    <label>Price($)</label>
                    <input className={classes.Input} onChange={onPriceChange} value={PriceValue} type="number"></input>                   
                </div>
                <div className={classes.FormControl}>
                    <label  className={classes.Label}>Stock Number</label>
                    <input className={classes.Input} onChange={onInventoryChange} value={InventoryValue} type="number"></input>                   
                </div >
                <div className={classes.FormControl}>
                    <label className={classes.Label}>Description</label>
                    <textarea className={[classes.TextArea, classes.Input].join(' ')}
                         onChange={onDescriptionChange} value={DescriptionValue}/>
                </div>
                <div className={classes.FormControl}>
                    <label  className={classes.Label}>Country</label>
                    <select className={classes.Input} onChange={onCountryChange} value={CountryValue}>
                        {CountryList.map((countryName,index) => (
                            <option key={index} value={index}>{countryName}</option>)
                        )}
                    </select>  
                </div>
                <div className={classes.FormControl}>
                    <button className={classes.Button}type="submit">Submit</button>
                </div>
            </form>        
        </div>
    )
}
