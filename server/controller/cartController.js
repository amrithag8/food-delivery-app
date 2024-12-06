

const mongoose=require("mongoose");
const User=require("../model/userModel");

exports.addToCart=async(req, res)=>{

  
    try{
      const {userID, productID}=req.body;
      const userDetails=await User.findById(userID);
      const cartDetails=await userDetails.cart;
      cartDetails[productID]=1;
      const newDetails= await User.findByIdAndUpdate(userID, {cart:cartDetails},{
        new: true,
      });
      
      res.status(200).json(newDetails.cart);
      // res.status(200).json({message:"Added"});
    }
    catch(err){
      console.error("Error adding to cart:", err);
  
      // Respond with an error message
      res.status(400).json({ message: "Failed to add product to cart" });
    }
    
  }

  exports.getCartData=async(req, res)=>{
    
    const cartData=await User.findById(req.body.userID);
    res.status(200).json(cartData.cart);
  }

  exports.incrementCart=async(req, res)=>{
    try{
      const{userID, productID}=req.body;
      const userDetails=await User.findById(userID);
      const cart=await userDetails.cart;
      cart[productID]+=1;
      const newDetails=await User.findByIdAndUpdate(userID, {cart},{new:true});
      res.status(200).json(newDetails.cart);
    }
    catch(error){
      console.error("Error adding items to cart:", error);
    
        // Respond with an error message
        res.status(400).json({ message: "Failed to add items to cart" });
    
    }
    
    
    
    }

    exports.removeFromCart=async(req, res)=>{
        try{
          const {userID, productID}=req.body;
          const userDetails=await User.findById(userID);
          const cart=await userDetails.cart;
          if(cart[productID]===1){
        delete cart[productID];
          }
          else if(cart[productID]>1){
            cart[productID]-=1;
          }
         const newDetails= await User.findByIdAndUpdate(userID, {cart},{new:true});
         res.status(200).json(newDetails.cart);
        }
        catch(error){
          console.error("Error removing from cart:", error);
      
          // Respond with an error message
          res.status(400).json({ message: "Failed to remove item from cart" });
      
        }
        
      }      