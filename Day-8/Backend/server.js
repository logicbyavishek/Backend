/**
 * Server Start & Connect to Database
 */
require("dotenv").config()
const app = require("./src/app") // require app
const connectToDB = require("./src/config/database") // require ConnectToDB 



connectToDB() // Call connectToDB Database connection function

app.listen(3000,()=>{ // Start server
    console.log("Server start on port 3000")
})