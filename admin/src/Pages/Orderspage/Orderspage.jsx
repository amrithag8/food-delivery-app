import React from 'react';
import "./Orderspage.css";
import { Sidebar } from '../../Components/Sidebar/Sidebar';

import { useEffect } from 'react';
import { useState } from 'react';

function Orderspage() {
  const[orderDetails, setOrderDetails]=useState();

  useEffect(()=>{
    const fetchOrders=async()=>{
const ordersAPI=await fetch(`${import.meta.env.VITE_BASE_URL}/admin/getuserOrders`);
const res=await ordersAPI.json();
setOrderDetails(res);
    }

    fetchOrders();
  },[]);


  const selectHandler=async(val, orderID)=>{
try{
  const response=await fetch(`${import.meta.env.VITE_BASE_URL}/admin/updateStatus`,{
    method:"PUT",
    headers:{
      'Content-type':'application/JSON'
    },
    body:JSON.stringify({val, orderID})
  })
  const res=await response.json();
  alert(res.message);
}
catch(err){
  console.log("error", err);
}

  }
  return (
    <>
    
    <div className='orderspage-outer'>
        
        <Sidebar/>
        <div className='orderspage-inner'>
      <h2>All present orders</h2>
      <div className='orders-list-outer'>
        {
          orderDetails?.map((order)=>{
            return(<div key={order._id} className='orders-list-inner'>
              <div key={order._id} className='order-ID'>
                  <p>{order._id}</p>
              </div>
              <div className='order-name-address'>
                {
order?.items?.map((orderItem)=>{
  return (
  <><p key={orderItem._id}>{orderItem.productName} * {orderItem.quantity}</p>
    
    </>)
})
                }

<p>{order.address.fName} {order.address.lName}</p>
    <p>{order.address.street}, {order.address.city}  </p>
    <p>{order.address.state}, {order.address.zipcode}</p>
    <p>{order.address.phoneNumber}</p>
                
            
            </div>
            
            <div className='order-price'>
                <p>${order.totalAmount}</p>
            </div>
            <div className='order-time'>
<p>{new Date(order.date).toLocaleString()}</p>
            </div>
            <div className='order-status'>
            <select name="order" id="order" onChange={(e)=>selectHandler(e.target.value, order._id)}>
  <option value="ordered">Ordered</option>
  <option value="Processing">Processing</option>
  <option value="Out for delivery">Out for delivery</option>
  <option value="Delivered">Delivered</option>
</select>
            </div>

        </div>
      
              )
          })
        }
        
        </div>    
      </div>
    </div>
    </>
  )
}

export default Orderspage
