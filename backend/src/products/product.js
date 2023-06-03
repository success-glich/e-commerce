const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Description of Product"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Price of Product"],
        maxLength:[8,"Price cannot exceed 8 figure"]
    },
    rating:{
        type:Number,
        default:0,
    },
   
    images:[{
        public_id:{
            type:String,
            required:ture
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true, "Category"]
    },
    stock:{
        type:Number,
        default:1,
        required:[true,"Please Enter Stock"],
        maxLength:[4,"Number cannot exceed 4 figure"]
    }

},{
    timestamps:true
});
const Products = mongoose.model("product",productSchema);
module.exports = Products;
