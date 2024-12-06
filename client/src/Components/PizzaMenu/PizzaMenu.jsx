import React, { useContext, useEffect, useState } from 'react';
import "./PizzaMenu.css";
import { StoreContext } from '../../Context/StoreContext';

function PizzaMenu({item}) {

 const [count, setCount]=useState(1);
 const{cartDetails, setCartDetails}=useContext(StoreContext);

  
  async function cartHandler(productID){

try{

  const fetchAPI=await fetch(`${import.meta.env.VITE_BASE_URL}/add-to-cart`, {
    method:"POST",
    headers: {
      'authorization':`${localStorage.getItem("accessToken")}`,
      'Content-type': 'application/json'
     },
  body:JSON.stringify({productID})
  
  
  })
  
  const res=await fetchAPI.json();
  
  // alert(res.message);
  setCartDetails(res);

}
catch(error){
  alert(error);
}




  }


  const decrementhandler=async(productID)=>{

    try{
      const decrementAPI=await fetch(`${import.meta.env.VITE_BASE_URL}/remove-from-cart`,{
        method:"PUT",
        headers:{
          "authorization":`${localStorage.getItem("accessToken")}`,
          "Content-type":"application/json"
        },
        body:JSON.stringify({productID})
      })
  
      const res=await decrementAPI.json();
      setCartDetails(res);
    }
    catch(error){
      console.log(error);
    }
    

  }


  const incrementHandler=async(productID)=>{
    try{
      const fetchAPI=await fetch(`${import.meta.env.VITE_BASE_URL}/add-to-cart`,{
        method:"PUT",
        headers:{
          'authorization':`${localStorage.getItem("accessToken")}`,
          'Content-type': 'application/json'
        },
        body:JSON.stringify({productID})
      })
      const res=await fetchAPI.json();
      
      setCartDetails(res);
    }
    catch(error){
      console.log(error);
    }


  }

  return (
    <div className='PizzaMenu-outer'>
      <div className='PizzaMenu-img'>
        <img src={`${import.meta.env.VITE_BASE_URL}/images/${item.productImage}`}/>
      </div>
      <div className='name-desc'>
      <h4>{item.productName}</h4>
      <p>{item.productDesc}</p>
      <hr/>
      </div>
      
      <div className='price-cart'>
        <h4>${item.price}</h4>
        {
        // cartDetails&& cartDetails.length > 0 &&
          cartDetails[item._id]>0?
          // ?.find(cartItem => cartItem.productType === item._id)?
          (<div className='countButton'>
            <div className='changecountbtn' onClick={()=>decrementhandler(item._id)}>-</div>
            <div className='countNumber'>{cartDetails[item._id]}</div>
            <div className='changecountbtn' onClick={()=>incrementHandler(item._id)}>+</div>
          </div>)
        :
          <button onClick={() => cartHandler(item._id)}>ADD TO CART</button>
        }
      
      </div>
    </div>
  )
}

export default PizzaMenu;
