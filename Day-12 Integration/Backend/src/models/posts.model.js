const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required :[true,"image is required for creating a post"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user is required for creating an post"]
    }
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel