import React,{ useState,useEffect } from 'react';
import ImageGallery from 'react-image-gallery';


export default function ProductImages(props) {

    const [Images, setImages] = useState([]);

    useEffect(() => {
        if(props.details.images && props.details.images.length > 0){
            let images = [];
            props.details.images.forEach(image => {
                images.push({
                    original:  `http://localhost:5000/${image}`,
                    thumbnail: `http://localhost:5000/${image}`
                })                                
            });
            setImages(images)
        }

    },[props.details])


    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}
