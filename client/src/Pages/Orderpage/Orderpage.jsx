import React, { useContext, useEffect } from 'react';
import "./Orderpage.css";
import { StoreContext } from '../../Context/StoreContext';

const Orderpage = () => {
  
  const{order}=useContext(StoreContext);

  

  
    

    const NumberofCartItems = order.reduce((total, item) => {
      return total + item.items.reduce((acc, curr) => acc + curr.quantity, 0);
    }, 0);

    

    
  return (
    <div className='order-page'>
      <h3>Your Orders</h3>
      <div className='order-list'>
        {
          order?.map((item)=>{
            return (
              <div key={item._id} className='order-details'>
                <div key={item._id} className='order-details-name'>
                {
           item?.items?.map((orderItem)=>{
            
                return (
                    
                    <p key={orderItem._id}>{orderItem?.productName} * {orderItem?.quantity}</p>
                    
                )
            
           }) 
           } 
           </div>
                    <p>${item?.totalAmount}</p>
                    <p>{NumberofCartItems}</p>
                    {item.status=="Delivered" ?<h4><span style={{color:"green"}}>&#x25cf;</span>{item.status}</h4>:
                    <h4><span style={{color:"tomato"}}>&#x25cf;</span>{item.status}</h4>}
                </div>
         
            )
          })
        }
                
        </div>
    </div>
  )
}

export default Orderpage;
