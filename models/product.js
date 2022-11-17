const mongoose=require('mongoose')

const ProductSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"]
    },
    price:{
        type:Number,
        required:[true,"Please provide price"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        em:{
            values:["ikea","liddy","caressa","marcos"],
            message:`{Value} is not supported`
        }
    }
})

module.exports=mongoose.model('Product',ProductSchema);