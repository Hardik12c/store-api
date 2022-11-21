const express=require('express')
const Product=require('../models/product')
const productrouter=express.Router();

productrouter.route('/')
.get(async(req,res)=>{
    try {
        const {name,featured,price,sort,fields}=req.query; // it will take only those things which are present in api and drop other values
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
        if(sort){
            const sortlist=sort.split(',').join(' ');
            results=results.sort(sortlist)
        }else{
            results=results.sort('createdAt');
        }
        if(fields){
            const fieldlist=fields.split(',').join(' ');
            results=results.select(fieldlist);
        }
        const limit=Number(req.query.limit);
        const page=Number(req.query.page);
        const skip=(page-1)*limit;

        results=results.skip(skip).limit(limit);
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