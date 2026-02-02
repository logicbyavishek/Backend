// Start Server & Connect Database
require("dotenv").config()
const app = require("./src/app")
const connectToDb = require("./src/config/database")


connectToDb()

app.listen(3000,()=>{
    console.log("Server Started on port 3000")
})