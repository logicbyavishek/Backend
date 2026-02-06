require("dotenv").config()
const app = require("./src/app")
const connecToDB = require("./src/config/database")



connecToDB()

app.listen(3000,()=>{
    console.log("Server Started on port 3000")
})