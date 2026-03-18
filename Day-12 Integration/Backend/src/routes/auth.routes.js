const express = require("express");
const authController = require("../controller/auth.controller") //controller for auth routes

const authRouter = express.Router(); //router for auth routes

/**
 * post /api/auth/register
 */

authRouter.post("/register", authController.registerController ); //register controller

/**
 * login /api/auth/login
 */
authRouter.post("/login", authController.loginController ); //login controller

module.exports = authRouter; //export auth router