import React, { useCallback, useContext, useMemo } from 'react';
import "./Header.css";
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { Debounce } from '../../utils/Debounce';
import { Throttle } from '../../utils/Throttle';

function Header({ setTriggerSignin, setTriggerSignup }) {
const navigate=useNavigate();
const{cartDetails, pizzaItemsMenu, activeUser, setPizzaItemsMenu}=useContext(StoreContext);

const NumberofCartItems=pizzaItemsMenu?.reduce((acc, curr)=>{
  if(cartDetails[curr._id]>0){
    return acc+cartDetails[curr._id];
  }
  return acc;
},0)
    

    const logoutHandler=()=>{
        localStorage.removeItem("accessToken");
        window.location.reload();

    }

    const loginHandler=()=>{
        setTriggerSignin(true);
    }

    const radioInputHandler=async(val)=>{
try{
  const fetchCategoryPizza=await fetch(`${import.meta.env.VITE_BASE_URL}/get-search-category?val=${val}`);
  const res=await fetchCategoryPizza.json();
  setPizzaItemsMenu(res);
}
catch(err){
  console.log("error", err);
}

    }

    const inputTypeHandler=async(val)=>{

      console.log("throttle", val);
      try{
        const fetchPizza=await fetch(`${import.meta.env.VITE_BASE_URL}/get-search-results?val=${val}`);
        const res=await fetchPizza.json();
        setPizzaItemsMenu(res);
      }
      
      catch(err){
        console.log(err);
      }

    }

    const DebounceFn=Debounce(inputTypeHandler, 500);
    
  return (
    <div className='Header-client-outer'>
      <div className='Header-client-inner'>
        <div className='logo'><i className="fa-solid fa-pizza-slice"></i></div>
        <h1>Pizza360</h1>
       
      </div>
      <div className='search-radio'>
      <div className='search-bar'>
      <i className="fa-solid fa-magnifying-glass"></i>
        <input type='text' placeholder='Search your favourite pizza' onChange={(e)=>DebounceFn(e.target.value)}/>
        
      </div>
      <div className='radio-input'>
        
        <p style={{fontWeight:"600"}}>Veg</p>
        {/* <div className='green-border' style={{border:"2px solid", width: "20px", height:"20px"}}> */}
        <span style={{color:"green", fontSize:"42px"}}>&#x2022;</span> 
        {/* </div> */}
        
        <input type="radio" name="veg" value="veg" onChange={(e)=>radioInputHandler(e.target.value)}/>
        <p style={{fontWeight:"600", marginLeft:"10px"}}>Non-veg</p>
        <span style={{color:"red", fontSize:"42px"}}>&#x2022;</span> 
        <input type="radio" name="veg"  value="Non-veg" onChange={(e)=>radioInputHandler(e.target.value)}/>
      </div>
      </div>
      <div className='Header-client-navbar'>
        <ul>
            <li onClick={()=>navigate("/")}>Menu</li>
            <li onClick={()=>navigate("/orders")}>Orders</li>
            <li onClick={()=>setTriggerSignup(true)}>Register</li>
            {
             localStorage.getItem("accessToken")? <li onClick={logoutHandler}>Logout</li>:<li onClick={loginHandler}>Login</li>  
            }
            
            <li className="cart-icon" onClick={()=>navigate("/cart")}><i className="fa-solid fa-cart-shopping"></i>{Object.keys(cartDetails).length>0&&<p>{NumberofCartItems}</p>}</li>
        </ul>
      </div>
    </div>
  )
}

export default Header




