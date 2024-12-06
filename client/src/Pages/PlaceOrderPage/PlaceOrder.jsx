import React, { useContext, useState } from 'react';
import "./PlaceOrder.css";
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const PlaceOrder = () => {
    const navigate=useNavigate();
    const{setAddress}=useContext(StoreContext);

const proceedTopaymentHandler=()=>{
  if(!fName||!lName||!email||!street||!city||!state||!zipcode||!country||!phoneNumber) return;
  const addres={
    fName, lName, email, street, city, state, zipcode, country, phoneNumber
  }
  
  setAddress(addres);
  navigate("/payment")
}
    

    const[fName, setFname]=useState("");
    const[lName, setLname]=useState("");
    const[email, setEmail]=useState("");
    const[street, setStreet]=useState("");
    const[city, setCity]=useState("");
    const[state, setState]=useState("");
    const[zipcode, setZipcode]=useState();
    const[country, setCountry]=useState("");
    const[phoneNumber, setPhonenumber]=useState();
  return (
    <div className='place-orderpage'>
      <div className='delivery-address'>
        <h3> Delivery Information</h3>

        <div className='address-info'>
            <div className='name-input'>
            <input type="text" placeholder='First Name *' required onChange={(e)=>setFname(e.target.value)}/>
            <input type="text" placeholder='Last Name *' required onChange={(e)=>setLname(e.target.value)}/>
            </div>
            <div className='email-input'>
            <input type="text" placeholder='Email *' required onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" placeholder='Street *' required onChange={(e)=>setStreet(e.target.value)}/>
            </div>
            <div className='city-input'>
            <input type="text" placeholder='City *' required onChange={(e)=>setCity(e.target.value)}/>
            <input type="text" placeholder='State *' required onChange={(e)=>setState(e.target.value)}/>
            </div>
            <div className='zipcode-input'>
            <input type="text" placeholder='Zip code *' required onChange={(e)=>setZipcode(e.target.value)}/>
            <input type="text" placeholder='Country *' required onChange={(e)=>setCountry(e.target.value)}/>
            </div>
            <div className='phone-input'>
            <input type="text" placeholder='Phone Number *' required onChange={(e)=>setPhonenumber(e.target.value)}/>
            </div>

        </div>
      </div>
      <div className='cart-totals'>
        <h3>Cart Totals</h3>

        <div className='cart-total'>
            <h3>Cart Total:</h3>
            <h3>$5677</h3>
            
        </div>
        <hr/>
        <button onClick={proceedTopaymentHandler}>PROCEED TO PAYMENT</button>
      </div>
    </div>
  )
}

export default PlaceOrder
