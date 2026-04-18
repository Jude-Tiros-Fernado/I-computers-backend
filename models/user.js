
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,//it means no two users can have the same email
        required:true//it means must be provided when creating a user
    },

    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        required:true,
        enum:["admin","customer"],//it means the value of role can only be "admin" or "customer"
        default:"customer"//it means if role is not provided when creating a user, it will be set to "customer" by default

    },

    isBlocked:{
        type:Boolean,
        default:false,
        required:true
    },

    isEmailVerified:{
        type:Boolean,
        default:false,
        required:true
    },

    Image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        required:true
    }

});

const User=mongoose.model("User",userSchema);

export default User;