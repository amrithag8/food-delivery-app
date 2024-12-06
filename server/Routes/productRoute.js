const express = require("express");
const router = express.Router();

const multer = require("multer");

const { getAllProducts, deleteProduct, getProductByID, addProductItem, editProductItem, getSearchResults, getSearchCategory } = require("../controller/productController");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split(".").pop();
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
    },
  });
  
  const upload = multer({ storage: storage });


router.get("/getallproducts", getAllProducts);
router.delete("/delete-product", deleteProduct);
router.get("/getByID/:id", getProductByID);
router.post("/add-item", upload.single("product_img"), addProductItem);
router.put("/edit-product", upload.single("product_img"),editProductItem);
router.get("/get-search-results", getSearchResults);
router.get("/get-search-category", getSearchCategory);

module.exports=router;