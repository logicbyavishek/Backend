//in this user.model.js file we define the user Schema 
const mongoose = require("mongoose") // we define user schema in our database Mongodb for that first of all 
// require the mongodb


/**
 *  UserSchema we define our user schema and define their types and also define that which is unique and which 
 * is not
 */
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exists"], /**we use this true because username must be unique  */
        required:[true,"Username is required"], // required beacuse without this we don't move farther
    },
    email:{
        type:String,
        unique:[true,"email is already exists"], /** email also unique  */
        required:[true,"email is required"] // required beacuse without this we don't move farther
    },
    password:{
        type:String,
        required:[true,"password is required"] 
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/buk7vdbsh/default%20image.jpg?updatedAt=1770818663225",
    }
})

const userModel = mongoose.model("users",UserSchema) //create mongoose model for user because it is necessary for create update and delete user

module.exports=userModel //export user model
