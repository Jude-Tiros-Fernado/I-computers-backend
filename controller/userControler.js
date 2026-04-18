
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){

    const hashPassword=bcrypt.hashSync(req.body.password,10);

    let user=new User({

        email:req.body.email,

        firstName:req.body.firstName,

        lastName:req.body.lastName,

        password:hashPassword
    });

    user.save(). then(
        ()=>{
            res.status(201).json({
                message:"User created successfully"
            })
        }
    )
    .catch(  

        ()=>{

            res.status(500).json({
                message:"user creation failed"
            })
        }
    )


}

export function logingUser(req,res){

   // console.log(req.body.email);//print the email provided in the request body

    User.findOne({

        email:req.body.email

    }).then(

        (user)=>{

            //console.log(user);//print the user object found in the database with the provided email

            if(user==null){

                res.status(401).json({

                    message:"user email not valid.. "
                })
            }

            else{

                const isPasswordValid=bcrypt.compareSync(req.body.password,user.password);
               // console.log(isPasswordValid);//print true if the provided password matches the hashed password stored in the database, otherwise print false
            
                if(isPasswordValid){

                    const token=jwt.sign({
                        email:user.email,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        password:user.password,
                        role:user.role,
                        isEmailVerified:user.isEmailVerified,
                        Image:user.Image
                    },"i-computer-secret");

                    console.log(token);//print the generated JWT token

                    const userData={
                        email:user.email,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        role:user.role,
                        isEmailVerified:user.isEmailVerified,
                        Image:user.Image
                    }
                    console.log(userData);//print the user data that will be sent in the response



                    res.status(200).json({
                        message:"login successful",
                        token:token
                    })
                }

                else{
                    res.status(401).json({

                        message:"password is not valid"
                    })
                }
            }
        }
    ).catch(()=>{
        res.status(500).json({
            message:"error in finding user with the provided email"
        })
    })


}
export function isAdmin(req,res){
    
    if(req.user==null){
        return false;
    }
    if(req.user.role=="admin"){
        return true
    }else{
        return false;
    }

}