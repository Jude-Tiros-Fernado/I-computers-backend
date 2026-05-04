import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

export default function authorize (rq,rs,next){

        console.log("middleware executed...");

        const header=rq.headers["authorization"];

        console.log(header);

        if(header !=null){
            
            const token=header.replace("Bearer ","");
            console.log(token);

            jwt.verify(token,process.env.JWT_Secret_KEY,
                (error,decoded)=>{
                    if(decoded==undefined||decoded==null){
                        
                        rs.status(401).json({
                            message:"invalid token please login again"
                        })
                    }else{
                    console.log(decoded);

                    rq.user=decoded;//store the decoded user information in the req.user property, making it accessible to subsequent middleware functions or route handlers in the request processing pipeline.   
                        
                    next()

                    }

                

                })



        }else{
            next();
        }

    }

