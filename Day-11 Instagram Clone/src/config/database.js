/**
 * this file databse.js used to connect to our db in this file we need to provide MONGO_URI  and this is come fro m .env file
 * in your case you provide your own MONGO_URI and not share to anyone
 */

const mongoose = require("mongoose")

async function connectToDB() { // use async function because we don't know how much time taken to connect to data base 
    await mongoose.connect(process.env.MONGO_URI)
    console.log("conected to MongoDB")
}

module.exports=connectToDB //export the connectToDB function to use it in server.js 