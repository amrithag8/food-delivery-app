import React, { useContext } from "react";
import "./PaymentsPage.css";
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const PaymentsPage = () => {

  const navigate=useNavigate();
  const{address}=useContext(StoreContext);
  const{cartDetails, pizzaItemsMenu, setOrder}=useContext(StoreContext);

  const paymentHandler=async()=>{
    const stripe=loadStripe(import.meta.env.VITE_STRIPE_KEY);

    const data = pizzaItemsMenu
  .filter(item => cartDetails[item._id] > 0) // Filter items with quantity > 0
  .map(item => ({
    ...item,
    quantity: cartDetails[item._id] // Add quantity from cartDetails
  }));

  
  

    const total=pizzaItemsMenu.reduce((acc, curr)=>{
      if(cartDetails[curr._id]>0){
        return acc+cartDetails[curr._id]*curr.price;
      }
      return acc;
    },0);

    
    const orderData={data, total, address};
    
try{
  const paymentAPI= await fetch(`${import.meta.env.VITE_BASE_URL}/payments`,{
    method: "POST",
    headers: {
      'authorization':`${localStorage.getItem("accessToken")}`,
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    body: JSON.stringify(orderData),
  })

  const session=await paymentAPI.json();
  if(session.id==='undefined'||session.id===null||!session.id){
    navigate("/cancel");
  }
  else{
    setOrder(session.orderDetails);
    navigate("/success");

    

  }
  
  // console.log("session", session);
}
catch(error){
  console.log(error);
}
    
  }

  return (
    <div className="payments-page">
      <div className="orderdetails">
        <p> -- Pay course</p>
        <h1>$5677</h1>
        <div className="orderitems">
          <div className="pizzadetails">
            <div className="pizzaitem">
              <p>Greek salad</p>
              <p>Qty: 2</p>
            </div>
            <div className="pizza-price">
              <p>$24</p>
              <p>$12 each</p>
            </div>
          </div>

          <div className="pizzadetails">
            <div className="pizzaitem">
              <p>Greek salad</p>
              <p>Qty: 2</p>
            </div>
            <div className="pizza-price">
              <p>$24</p>
              <p>$12 each</p>
            </div>
          </div>

          <div className="pizzadetails">
            <div className="pizzaitem">
              <p>Greek salad</p>
              <p>Qty: 2</p>
            </div>
            <div className="pizza-price">
              <p>$24</p>
              <p>$12 each</p>
            </div>
          </div>
        </div>
        <div
          className="stripe-info"
          style={{ marginTop: "100px", display: "flex", gap: "30px" }}
        >
          <p style={{ color: "gray", fontSize: "13px" }}> Powered by Stripe </p>
          <p style={{ color: "gray", fontSize: "13px" }}> Terms </p>
          <p style={{ color: "gray", fontSize: "13px" }}> Privacy</p>
        </div>
      </div>
      <div className="paymentdetails">
        <h3>Pay with card</h3>

        <h5>Email</h5>
        <input type="email" />
        <h5>Card information</h5>
        <input type="text" placeholder="1234 1234 1234 1234" />
        <div className="card-details">
          <input type="text" placeholder="MM/YY" />
          <input type="text" placeholder="CVV" />
        </div>
        <h5>Cardholder name</h5>
        <input type="text" />
        <h5>Country or region</h5>
        <input type="text" />

        <button onClick={paymentHandler}>Pay</button>
      </div>
    </div>
  );
};

export default PaymentsPage;
