import e from "express";
import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    productId:{
        type:String,
        require:true,
        unique:true
        },
        name:{
            type:String,
            require:true
        },
        description: {
            type:String,
            require:true
        },
        altNames:{
            type:[String],
            default:[]
        },
        price:{
            type:Number,
            require:true
        },
        labelPrice:{
            type:Number,

        },
        category:{
            type:String,
            default:"Others"
            },
        image:{
            type:[String],
            default:["https://www.pngall.com/wp-content/uploads/5/Product-Image-Transparent.png"]
        },
        isVisible:{
            type:Boolean,
            default:true,
            require:true    
        },
        brand:{
            type:String,
            default:"Generic"
        },
        model:{
            type:String,
            default:"standard"
        }
    }
);
const Product=mongoose.model("Product",productSchema);
export default Product;


