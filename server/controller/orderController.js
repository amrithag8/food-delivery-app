const mongoose=require("mongoose");
const Order=require("../model/orderModel");
const User=require("../model/userModel");
const Stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);





exports.orderPayment=async(req, res)=>{
    
    const{data, total, address, userID}=req.body;
    // const userDetail=await User.findById(userID);
    // const cartDetail=await userDetail.cart;
    

    const line_items=data.map((item)=>({

        price_data:{
            currency:"usd", 
            product_data: {
                name:item.productName 
            },
            unit_amount:item.price*100*80,

        },

        quantity:item.quantity
        
    }))

    const session=await Stripe.checkout.sessions.create({
        line_items:line_items,
        mode:"payment",
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/cancel",

    })
    
    if (session.id){
        await Order.create({userID, items:data, totalAmount:total, address, });
        const orderDetails=await Order.find();
        const userDetail=await User.findByIdAndUpdate(userID,{cart:{}});
        res.json({id:session.id,orderDetails });
    }

    else{
        res.json({message:"Failed"});
    }
   

   
  
}

exports.getAllOrders=async(req, res)=>{

const{userID}=req.body;
try{
    const orderDetails=await Order.find({userID});
    res.status(200).json(orderDetails);
}
catch(error){
console.log("error from orderController", error);
}

}

exports.getUserOrders=async(req, res)=>{
    const getOrders=await Order.find();
    
    res.status(200).json(getOrders);
}

exports.updateOrderStatus=async(req, res)=>{
    
    const{val, orderID}=req.body;
    try{
        await Order.findByIdAndUpdate(orderID, {status:val});
        res.json({message:"Updated status"});
    }
    
    catch(err){
        console.log("error", err);
    }

}