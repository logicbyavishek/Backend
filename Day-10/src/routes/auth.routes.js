const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
const crypto = require("crypto")

/**
 * /api/auth/register
 */
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      success: false,
      errorCode: "USER_ALREADY_EXISTS",
      message: "Email already registered",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")

  const user = await userModel.create({
    email,
    name,
    password:hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token",token)

  res.status(201).json({
    message: "User Created Successfully",
    user,
    token,
  });
});

/**
 * /api/auth/protected
 */
authRouter.post("/protected",(req,res)=>{
  console.log(req.cookies)
  res.status(200).json({
    message:"This is a protected Route"
  })
})

/**
 * /api/auth/login
 * which api are call when a api hits this also called controller
 */
authRouter.post("/login",async (req,res)=>{
  const{email,password}=req.body

  const user =await userModel.findOne({email})
  if(!user){
    res.status(404).json({
      message:"User not found with this email"
    })
  }

  const userPassword = user.password=== crypto.createHash("md5").update(password).digest("hex")
  if(!userPassword){
    res.status(401).json({
      message:"Password not matched"
    })
  }

  const token = jwt.sign(
    {
      id: user._id
    },
    process.env.JWT_SECRET
  )

  res.status(200).json({
    message:"User loggedin",
    user
  })

})




module.exports = authRouter;
