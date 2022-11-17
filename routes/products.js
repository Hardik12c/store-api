const express=require('express')
const Product=require('../models/product')
const productrouter=express.Router();

productrouter.route('/')
.get(async(req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json({products});
    } catch (error) {
        console.log(error);
    }
});

productrouter.route('/static')
.get(async(req,res)=>{
    try {
        const product=await Product.find({featured:true});
        res.status(200).json({product});
    } catch (error) {
        console.log(error);
    }
})

module.exports=productrouter