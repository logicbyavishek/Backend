require("dotenv").config() //at firt configure dot env without this we face error to collect value from dotenv folder
const app = require("./src/app") //import app from app.js
const connectToDB = require("./src/config/database") //import connectToDB from database.js

connectToDB() // call the connectToDB function for connected to data base

app.listen(3000,()=>{
    console.log("server started on port 3000")
})