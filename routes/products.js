const express=require('express')
const Product=require('../models/product')
const productrouter=express.Router();

productrouter.route('/')
.get(async(req,res)=>{
    try {
        const {name,featured,price,sort}=req.query; // it will take only those things which are present in api and drop other values
        queryobj={};
        if(featured){
            queryobj.featured=(featured==='true')?true:false;
        }
        if(name){
            queryobj.name=name;
        }
        if(price){
            queryobj.price=price;
        }
        let results= Product.find(queryobj);
        console.log(typeof(results));
        if(sort){
            const sortlist=sort.split(',').join(' ');
            results=results.sort(sortlist)
        }else{
            results=results.sort('createdAt');
        }
        products=await results;  //waiting for results to be fetch
        res.status(200).json({products,length:products.length});
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