import { useNavigate } from "react-router-dom";
import { img_URL } from "../../utils/constant";
import "./CartPage.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";

export const CartPage = () => {
  const navigate=useNavigate();
  const {cartDetails, pizzaItemsMenu}=useContext(StoreContext) ; 
const total=pizzaItemsMenu?.reduce((acc, curr)=>{
if(cartDetails[curr._id]>0){
    return curr.price*cartDetails[curr._id]+acc;
}
return acc;
},0);

  return (
    <div className="cart-page">
      <h1>
        <i className="fa-solid fa-cart-shopping"></i> Cart Summary
      </h1>
      <hr />
      {
        Object.keys(cartDetails).length!==0?(
        <>
        <div className="cart-items-outer">
          {pizzaItemsMenu?.map((item) => {
            if (cartDetails[item._id] > 0) {
              return (
                <div key={item._id} className="cart-item-inner">
                  <div className="cart-item-img">
                    <img src={`${img_URL}/${item.productImage}`} />
                    <h3>{item.productName}</h3>
                  </div>
                  <p>{cartDetails[item._id]}</p>
                  <p>${item.price}</p>
                </div>
              );
            }
          })}
        </div>
  
        <div className="cart-footer">
          <h3>Cart Total:</h3>
  
          <h3>${total}</h3>
        </div>
        <button className="checkout-button" onClick={()=>navigate("/place-order")}>PROCEED TO CHECKOUT</button>
      </>):(<div style={{padding:"0px 10px", marginTop:"10%"}}><h1>Your cart is empty. Add items to your cart</h1></div>)
      }

      
    </div>
  );
};
