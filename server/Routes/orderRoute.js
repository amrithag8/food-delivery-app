const express=require("express");
const checkAuth = require("../middlewares/auth");
const { orderPayment, getAllOrders, getUserOrders, updateOrderStatus } = require("../controller/orderController");
const router=express.Router();


router.post("/payments", checkAuth, orderPayment);
router.get("/getAllorders", checkAuth,getAllOrders )
router.get("/admin/getuserOrders",getUserOrders );
router.put("/admin/updateStatus", updateOrderStatus);





module.exports=router;
