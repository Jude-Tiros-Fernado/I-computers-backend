
import Product from "../models/product.js";
import { isAdmin } from "./userControler.js";

export async function createProduct(req,res){
    if(! isAdmin (req) ){
        res.status(401).json({
            message:"You are not authorized to create a product"
        })
        return;
    }
    try{
        //create a product part
        //check the exiting product with the same productId
        const existingProduct=await Product.findOne({
            productId:req.body.productId
        })
        if(existingProduct){
            res.status(400).json({
                message:"product with given productId already exists"
            })
            return;
        }
        const data={};
        data.productId=req.body.productId;
        data.name=req.body.name;
        data.description=req.body.description ||"";
        data.altNames=req.body.altNames ||[];

        if(req.body.price == null){
            res.status(400).json({massage:"product price is required"});
            return;
        }
        data.price=req.body.price;
        data.labelPrice=req.body.labelPrice || req.body.price;
        data.category=req.body.category || "Others";
        data.image=req.body.image ||["https://www.pngall.com/wp-content/uploads/5/Product-Image-Transparent.png"];
        data.isVisible=req.body.isVisible ;
        data.brand=req.body.brand || "Generic";
        data.model=req.body.model || "standard";

        const product=new Product(data);
        await product.save();
        res.status(201).json({
            message:"product created successfully",
            product:product
        })


    }catch(error){
        res.status(500).json({
            message:"product creation failed",error:error
        })
    }

    

}
export async function getProducts(req,res){
        try{
//admin can see all products but normal user can see only visible products
            if(isAdmin(req)){
            const products=await Product.find();
            res.status(200).json({
                message:"products fetched successfully",
                products:products
            })
            }
            else{
                const products=await Product.find({isVisible:true});
                res.status(200).json({products:products})

                }
            }

        catch(error){
            res.status(500).json({
                message:"failed to fetch products",error:error
            })
        }
}
export async function deleteProduct(req,res){
    if(! isAdmin (req) ){
        res.status(401).json({
            message:"Only admin can delete a product"
        })
        return;
    }
    try{
        const productId=req.params.productId;
        await Product.deleteOne({productId:productId});
        res.status(200).json({
            message:"product deleted successfully"
        })

    }
    catch(error){
        res.status(500).json({
            message:"failed to delete the product",error:error
        })
    }
}
export async function updateProduct(req,res){
    if(! isAdmin(req)){
        res.status(401).json({massage:"Only admin can update a product"});
        return;
    }
    try{
        const productId=req.params.productId;
        const data={};

        if(req.body.name==null){
            res.status(400).json({massage:"product name is required,can not update the product without name"});
            return;
        }

        data.name=req.body.name;
        data.description=req.body.description ||"" ;
        data.altNames=req.body.altNames||[] ;
        
        if(req.body.price == null){
            res.status(400).json({massage:"product price is required"});
            return;
        }
        data.price=req.body.price ;

        data.labelPrice=req.body.labelPrice || req.body.price ;
        data.category=req.body.category || "Others" ;
        data.image=req.body.image ||["https://www.pngall.com/wp-content/uploads/5/Product-Image-Transparent.png"] ;
        data.isVisible=req.body.isVisible ;
        data.brand=req.body.brand || "Generic" ;
        data.model=req.body.model || "standard" ;

        await Product.updateOne({productId:productId},data);
        res.status(200).json({
            message:"product updated successfully"
        })
        

    }catch(error){
        res.status(500).json({
            message:"failed to update the product",error:error
        })
    }
}
export async function getProductById(req,res){ 
    try{
        const productId=req.params.productId;
        const product=await Product.findOne({productId:productId});
        if(product==null){
            res.status(404).json({
                message:"product not found with the given productId"
            })
            return;
        }
        if(! product.isVisible){
            if( ! isAdmin(req)){
                res.status(404).json({
                    message:"product not found with the given productId"
                })
                return;
            }
        }
        res.status(200).json({
            message:"product fetched successfully",
            product:product
        })

    }
        catch(error){
            res.status(500).json({
                message:"failed to fetch the product",error:error
            })
        }
}