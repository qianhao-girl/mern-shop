import React,{ useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {FaPlus} from 'react-icons/fa';

function FileUpload(props) {
    const [imageUrls, setImageUrls] = useState([]);

    //The FormData interface provides a way to easily construct 
    //a set of key/value pairs representing form fields and their values, 
    //which can then be easily sent using the XMLHttpRequest.send() method. 
    //!!!!It uses the same format a form would use if the encoding type were set to "multipart/form-data".
   //for more info: https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const onDrop = (acceptedFiles) => {
        let formData = new FormData();
        const config = { header: {'content-type': 'multipart/form-data'}};
        console.log('acceptedFiles[0]: ',acceptedFiles[0]);
        formData.append("image",acceptedFiles[0]);
        axios.post('/api/products/uploadImage', formData, config)
            .then(response => {
                if(response.data.success){
                    // console.log('image.path',response.data.image)
                    setImageUrls([...imageUrls,response.data.image ]);
                    props.updateParentImages([...imageUrls, response.data.image]);
                }else{
                    alert("failed to save the image to the server");
                }
            })
    }

    const onDelete = (image) => {
        const currentIndex = imageUrls.indexOf(image);
        let newImages = [...imageUrls];
        newImages.splice(currentIndex,1);
        setImageUrls(newImages);
    }
    

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "4rem"}}>
            <Dropzone
                onDrop={onDrop}
                accept="image/png,image/jpg,image/jpeg"
                maxSize={45000000}
                multiple={false}
            >
                {
                    ({getRootProps, getInputProps}) => (
                        <div style={{width: "300px", height: "240px", border:" 1px solid lightgray",
                            display:"flex", alignItems: "center",justifyContent: "space-around"}}
                            { ...getRootProps() }
                        >
                            <input {...getInputProps()}></input>
                            <FaPlus size="3rem"></FaPlus>
                        </div>
                    )
                }
            </Dropzone> 
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll', marginLeft:"2rem" }}>
                {
                    imageUrls.map((image, index) => (
                        <div key={index} onClick={() => onDelete(image)}>
                            <img src={`http://localhost:5000/${image}`} alt={`productImg-${index}`}></img>
                        </div>
                    ))
                }
            </div>    
        </div>       
    )
}

export default FileUpload;
