import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../Components/Header/Header";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./AddItems.css";

import React, { useEffect, useRef, useState } from 'react'

function AddItems() {

  const [productImage, setProductImage]=useState("");
  const[productName, setProductName]=useState("");
  const[productDesc, setProductDesc]=useState("");
  const[category, setCategory]=useState("");
  const[price, setPrice]=useState(0);
  const[displayImage, setDisplayImage]=useState();
  const[productDetails, setProductDetails]=useState([]);
  const fileInputRef=useRef();
  const navigate=useNavigate();
  const location=useLocation();
  const id=useParams();
  
  
  useEffect(()=>{

    if(id){
      
      getProductByID(id); 
    }
   else{
    
    setProductDetails([]);
    
   } 

    
    
  },[id, location.pathname]);

  const getProductByID=async(id)=>{
    const fetchUserAPI=await fetch(`${import.meta.env.VITE_BASE_URL}/getByID/${JSON.stringify(id)}`);
    const res=await fetchUserAPI.json();
    setProductDetails(res);
  }
  

  const addHandleClick=async(e)=>{
    e.preventDefault();
    
    
    const formData=new FormData();
    formData.append('product_img', productImage);
    formData.append('productName', productName);
    formData.append('productDesc', productDesc);
    formData.append('category', category);
    formData.append('price', price);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.type = "text";
      fileInputRef.current.type = "file";
  }
    setDisplayImage();
    setProductName("");
    setProductDesc("");
    setCategory("");
    setPrice(0);

    try {
      const fetchApi= await fetch(`${import.meta.env.VITE_BASE_URL}/add-item`,{
        method:"POST",
        body:formData,
        
      });
      const res=await fetchApi.json();
      
      alert(res.message);
      



  
      
    } catch (error) {
      console.log(error);
      
    }
    
  }


  const editHandleClick=async(e)=>{
    e.preventDefault();

const obj={productName:productName||productDetails.productName, };

const formData=new FormData();
formData.append('product_img', productImage);
    formData.append('productName',productName||productDetails.productName);
    formData.append('productDesc', productDesc||productDetails.productDesc);
    formData.append('category', category||productDetails.category);
    formData.append('price', price||productDetails.price);
    formData.append('id', productDetails._id);



const fetchAPI=await fetch(`${import.meta.env.VITE_BASE_URL}/edit-product`, {
  method:"PUT",
  body:formData
});

const res=await fetchAPI.json();

navigate("/list-item");
  }

  return (
    <div>
        
        <div className="addItem-sidebar">
        <Sidebar/>
      <div className="addItem-main">
        {
          productDetails?(<form className="addItem-main-container" onSubmit={editHandleClick} >
            <label htmlFor="image">To upload another one click on the image</label>
            {
              displayImage?(<label htmlFor="image" style={{width:"150px", height:"150px", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid", padding:"8px"}}><img src={displayImage} style={{width:"130px", height:"130px", objectFit:"cover"}}/></label>):(<label htmlFor="image" style={{width:"150px", height:"150px", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid", padding:"8px"}}><img src={`http://localhost:3000/images/${productDetails.productImage}`} style={{width:"130px", height:"130px", objectFit:"cover"}}/></label>
            )
            }
          
          <input type="file" id="image" ref={fileInputRef} style={{display:"none"}} onChange={(e)=>{setProductImage(e.target.files[0])
          setDisplayImage(URL.createObjectURL(e.target.files[0]))
          }
          }/>
          <label htmlFor="name">Product name</label>
          <input type="text" id="name" defaultValue={productDetails.productName} onChange={(e)=>setProductName(e.target.value)} required/>
          <label htmlFor="desc">Product Description</label>
          <textarea rows="5" cols="50" id="desc" defaultValue={productDetails.productDesc} onChange={(e)=>setProductDesc(e.target.value)} required></textarea>
          <label htmlFor="category">Product Category</label>
          <select name="category" id="category" defaultValue={productDetails.category} onChange={(e)=>setCategory(e.target.value)} required>
          <option value="" ></option>
          {
            (productDetails.category==='veg')?(<><option value="veg" selected>Veg</option> <option value="Non-veg">Non-veg</option></>):(<><option value="veg" >Veg</option> <option value="Non-veg" >Non-veg</option></>)
          }
    
    
   
  </select>
  <label>Product Price</label>
  <input type="text" defaultValue={productDetails.price} onChange={(e)=>setPrice(e.target.value)} required/>
  <button type="submit" >Edit</button>
  </form>)
  :(<form className="addItem-main-container" onSubmit={addHandleClick} >
          {
            displayImage?(<label htmlFor="image">To upload another one click on the image</label>):(<label htmlFor="image">Upload Image</label>)
          } 
          {/* <label htmlFor="image" style={{width:"150px", height:"150px", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid", padding:"8px"}}><img src='https://cdn-icons-png.flaticon.com/512/126/126477.png' style={{width:"100px", height:"100px"}}/></label> */}
         {
          displayImage?(<label htmlFor="image" style={{width:"150px", height:"150px", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid", padding:"8px"}}><img src={displayImage} style={{width:"130px", height:"130px", objectFit:"cover"}}/></label>)
          :(<label htmlFor="image" style={{width:"150px", height:"150px", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid", padding:"8px"}}><img src='https://cdn-icons-png.flaticon.com/512/126/126477.png' style={{width:"100px", height:"100px"}}/></label>)
         } 

          <input type="file" id="image" ref={fileInputRef} style={{display:"none"}} onChange={(e)=>{setProductImage(e.target.files[0])
            setDisplayImage(URL.createObjectURL(e.target.files[0]))
          }} required/>
          <label htmlFor="name">Product name</label>
          <input type="text" id="name" value={productName} onChange={(e)=>setProductName(e.target.value)} required/>
          <label htmlFor="desc">Product Description</label>
          <textarea rows="5" cols="50" id="desc" value={productDesc} onChange={(e)=>setProductDesc(e.target.value)} required></textarea>
          <label htmlFor="category">Product Category</label>
          <select name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} required>
          <option value="" ></option>
    <option value="veg" >Veg</option>
    <option value="Non-veg" >Non-veg</option>
   
  </select>
  <label>Product Price</label>
  <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} required/>
  <button type="submit" >Add</button>
  </form>)
        }
        
        </div>
      </div>
    </div>
  )
}

export default AddItems
