const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)

    console.log("connected to DB")
}

module.exports=connectToDB