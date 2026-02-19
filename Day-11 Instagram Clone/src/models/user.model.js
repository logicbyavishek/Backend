const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exists"],
        required:[true,"Username is required"],
    },
    email:{
        type:String,
        unique:[true,"email is already exists"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:String,
    profile_image:{
        type:String,
        default:"https://ik.imagekit.io/buk7vdbsh/default%20image.jpg?updatedAt=1770818663225",
    },
})

const userModel = mongoose.model("users",UserSchema)

module.exports=userModel