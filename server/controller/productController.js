const mongoose=require("mongoose");
const Product=require("../model/productModel");

exports.getAllProducts=async(req, res)=>{
    const allProducts=await Product.find();
    res.status(200).json(allProducts);
}

exports.deleteProduct=async(req, res)=>{

    await Product.findByIdAndDelete(req.body.productID);
    const restofproducts=await Product.find();
    res.status(200).json(restofproducts);
}

exports.getProductByID=async(req, res)=>{
    const{id}=JSON.parse(req.params.id);
    const productDetails=await Product.findById(id);
    res.status(200).json(productDetails);
}

exports.addProductItem=async (req, res) => {
    const {productName, productDesc, category, price}=req.body;
    
    
    try {
        if(productName==='undefined'||productDesc==='undefined'||category==='undefined'||price==='undefined')
          return res.status(400).json({message:"Some fields are missing"});

        await Product.create({
            productName,
            productImage: req.file.filename,
            productDesc,
            category,
            price,
          });
        
        
          res.status(200).json({message:"Added"});
        
    } catch (error) {
        res.status(400).json({message:error});
    }
  
};

exports.editProductItem=async(req, res)=>{
    const{id, productName, productDesc, category, price}=req.body;
    
    
    try {

        if(req.file===undefined ||req.file===null){
            console.log("hi");
            const updatedVal=await Product.findByIdAndUpdate(id, {productName,productDesc, category, price }, {new:true});
            return res.status(200).json(updatedVal);
        }
        else{
            console.log("file");
            const updatedVal=await Product.findByIdAndUpdate(id, {productImage:req.file.filename,productName,productDesc, category, price }, {new:true});
            return res.status(200).json(updatedVal);
        }
        
    } catch (error) {
      return res.status(400).json(error);  
    }
    
};

exports.getSearchResults=async(req, res)=>{
    try{
        const{val}=req.query;
        const searchresults=await Product.find();
        const filteredResults=searchresults.filter((result)=>{
            return result.productName.toLowerCase().includes(val.toLowerCase());
             
            
           
        })
        
        res.status(200).json(filteredResults);
    }
    catch(err){
        console.log(err);
    }
    
}

exports.getSearchCategory=async(req, res)=>{
    try{
        const{val}=req.query;
        const Allproducts=await Product.find();
        const filteredResults=Allproducts.filter((item)=>{
         return item.category===val;
        })
        
        res.status(200).json(filteredResults);
    }
    catch(err){
        console.log("err", err);
    }
}