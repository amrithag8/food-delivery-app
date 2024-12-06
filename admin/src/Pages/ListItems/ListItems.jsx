import { useNavigate } from "react-router-dom";
import { Header } from "../../Components/Header/Header";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./ListItems.css";

import React, { useEffect, useState } from 'react'

function ListItems() {

    const[pizzaDetails, setPizzaDetails]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        
        const getProductDetails=async()=>{
            const productApi=await fetch(`${import.meta.env.VITE_BASE_URL}/getallproducts`);
            const res=await productApi.json();
            setPizzaDetails(res);
        }

        getProductDetails();
    },[]);

    const handleDeleteProducts=async(productID)=>{
const deleteProductAPI=await fetch(`${import.meta.env.VITE_BASE_URL}/delete-product`,{
    method:"DELETE",
    headers: {
        'Content-type': 'application/json'
       },
    body:JSON.stringify({productID})
});


    }

    const handleEditProducts=async(productID)=>{

        navigate(`/admin/add-item/${productID}`);
const editProductAPI=await fetch(`${import.meta.env.VITE_BASE_URL}/edit-product`,{
    method:"PUT",
    headers: {
        'Content-type': 'application/json'
       },
       body:JSON.stringify({productID})  
})


    }
  return (
    <div>
    {/* <Header/> */}
    <div className="listItems-sidebar">
     <Sidebar/>

     <div className="listItems-main-container">
        
<h2>All food items({pizzaDetails.length})</h2>
<div className="listItems-main-inner-container">
    <div className="listItems-menu-heading">
        <div className="food-img">
            <h4>Image</h4>
        </div>
        <div className="food-name">
        <h4>Name</h4>
        </div>
        <div className="food-category">
        <h4>Category</h4>
        </div>
        <div className="food-price">
        <h4>Price</h4>
        </div>
        <div className="food-edit">
        <h4>Edit</h4>
        </div>
        <div className="food-delete">
        <h4>Delete</h4>
        </div>

    </div>

    {
        pizzaDetails.map((product)=>{
            return (
<div key={product._id} className="listItems-menu">
<img src={`http://localhost:3000/images/${product.productImage}`}/>
<div className="food-name">
    <p>{product.productName}</p>
</div>
<div className="food-category">
    <p>{product.category}</p>
</div>
<div className="food-price">
    <p>${product.price}</p>
</div>
<div className="food-edit" onClick={()=>handleEditProducts(product._id)}>
    <p><i className="fa-regular fa-pen-to-square"></i></p>
</div>
<div className="food-delete" onClick={()=>handleDeleteProducts(product._id)}>
<p><i className="fa-solid fa-trash"></i></p>
</div>


    </div>
            )
        })
    }
    
    
    



</div>
     </div>
     </div>
    </div>
  )
}

export default ListItems
