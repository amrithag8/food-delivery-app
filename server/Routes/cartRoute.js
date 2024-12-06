const express=require("express");
const router=express.Router();
const checkAuth=require("../middlewares/auth");
const { addToCart, getCartData, incrementCart, removeFromCart } = require("../controller/cartController");


router.post("/add-to-cart", checkAuth, addToCart);
router.get("/getCartData", checkAuth, getCartData);
router.put("/add-to-cart", checkAuth, incrementCart);
router.put("/remove-from-cart", checkAuth, removeFromCart);

module.exports=router;

