import React, { useState, useRef, useEffect } from 'react';
import DefaultImage from '/images/picture-frame.png' 
import { QUERY_CATEGORIES, QUERY_PRODUCTS } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT } from '../utils/mutations'; 

function UploadFiles() {
    
    const [avatarURL, setAvatarURL] = useState(DefaultImage);
    const [formData, setFormData] = useState({
        name:"",
        description: "",
        image: "",
        price: 0,
        size: "",
        category: "",
    })
    
    const [formProducts, setFormProducts] = useState(["None", "Small", "Medium", "Large", "XL", "XXL"])


    const fileUploadRef = useRef();

    const queryMultiple = () => {
        const res1 = useQuery(QUERY_PRODUCTS);
        const res2 = useQuery(QUERY_CATEGORIES);
        return [res1, res2];
      }
      
    const [
        { loading: loading1, data: sizeData },
        { loading: loading2, data: categoryData }
    ] = queryMultiple()
    
    const handleChange = (e) => {
        const {name, value} = e.target
        let formValue = value;
        if(name == "price"){
            formValue = parseFloat(value)
        } 
        setFormData(()=>({...formData, [name]: formValue}));
    }

    const handleImageUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current.click();
    }

    const uploadImageDisplay = async () => {
        try {
            const uploadedFile = fileUploadRef.current.files[0];
            const imgFormData = new FormData();
            imgFormData.append('file', uploadedFile);
    
            const response = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
                method: "post",
                body: imgFormData
            });

            if (response.ok) {
                const data = await response.json();
                setAvatarURL(data?.location);
                console.log(formData)
                setFormData({...formData, image: data?.location})
                console.log(data?.location)
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setAvatarURL(DefaultImage)
        }
    }

    const [addProduct, { data, loading, error }] = useMutation(ADD_PRODUCT);

        if (loading) return 'Submitting...';
        if (error) return `Submission error! ${error.message}`;

        const submitHandle = (event) => {
            event.preventDefault();
            
            // Check if the required fields are filled in
            if (!formData.name || !formData.description || !formData.size || !formData.image || !formData.category) {
                alert("Please fill in all required fields (name, description, size, image, category)");
                return; // Stop form submission if required fields are missing
            }
        
            console.log(formData);
        
            addProduct({ variables: { productInput: formData } }).then((response) => {
                if (response.data || response.data.ok) {
                    alert("Submit success");
                } else {
                    alert("Submit failed");
                }
            }).catch((error) => {
                alert("An error occurred: " + error.message);
            });
        };

        return (
            <div className='container-fluid d-flex flex-row mb-3'>
              <img 
                src={avatarURL}
                alt ="Avatar"
                style={{"height" : "200px", "width" : "200px"}}
                />

              <form id="form" encType='multipart/form-data' onSubmit={submitHandle}>
                <div className='className="row justify-content-center mb-3"'>
                    <input type="text" value={formData.name} name="name" placeholder='Product Name' onChange={handleChange}/>
                </div>
                
                <button 
                    className="row justify-content-center mb-3"
                    type='submit'
                    onClick={handleImageUpload}
                    >
                </button>
                <input 
                    className="row justify-content-end mb-3"
                    type='file'
                    id='file'
                    ref={fileUploadRef}
                    onChange={uploadImageDisplay}
                />
                <div>
                    <textarea name="description" id="" value={formData.description} onChange={handleChange}></textarea>
                </div>
                
                <div className="row  justify-content-center mb-3">
                    <p>
                        <label htmlFor="price"></label>
                        <input id="price" type="number" step="0.01" min="0.01" name="price" rows="1" cols="10" value={formData.price} onChange={handleChange}></input>
                    </p>
             </div>
            <div className="row justify-content-center mb-3">
            <p>
                <select name="category" value={formData.category} id="category" onChange={handleChange}>
                    {categoryData?.categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
            </p>
            <div className="row justify-content-center mb-3">
                <p>
                    <select name='size' value={formData.size} id="size" onChange={handleChange}>
                        {formProducts && formProducts.map((product, index) => (
                            <option key={index} value={product}>{product}</option>

                        ))}
                    </select>
                </p>
            </div>
            </div>

            <div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </div>
            
            
            </form>
            </div>
         )
        }
export default UploadFiles;

    