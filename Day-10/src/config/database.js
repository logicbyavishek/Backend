const mongoose = require("mongoose");

function connecToDB() {
  mongoose.connect(process.env.MONGO_URI)
    .then(res=>{
        console.log("Connected to DataBase")
    })
}

module.exports=connecToDB