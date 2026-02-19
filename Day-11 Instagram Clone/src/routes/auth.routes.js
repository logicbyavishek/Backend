const express = require("express")
const userModel = require("../models/user.model")
const authRouter = express.Router()

authRouter.post("/register", async (req,res)=>{
    const {username,email,passowrd,bio,profilrImage}=req.body

    // check if user exist with same email or username ?

    const isUserExistsByEmail = await userModel.findOne({email})

    if(isUserExistsByEmail){
        return res.status(409).json({
            message:"user already exists with same email"
        })
    }

    const isUserExistsByUsername = await userModel.findOne({username})

    if(isUserExistsByUsername){
        return res.status(409).json({
            message:"user already exists with same username"
        })
    }
})