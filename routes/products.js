const express=require('express')

const productrouter=express.Router();

productrouter.route('/')
.get(async(req,res)=>{
    try {
        res.status(200).json({messg:"getting product"});
    } catch (error) {
        console.log(error);
    }
});

productrouter.route('/static')
.get(async(req,res)=>{
    try {
        res.status(200).json({messg:"getting static product"});
    } catch (error) {
        console.log(error);
    }
})

module.exports=productrouter