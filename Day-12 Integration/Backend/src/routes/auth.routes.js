const express = require("express");
const authController = require("../controller/auth.controller") //controller for auth routes
const identifyUser = require("../middlewares/auth.middleware")

const authRouter = express.Router(); //router for auth routes

/**
 * post /api/auth/register
 */

authRouter.post("/register", authController.registerController ); //register controller

/**
 * login /api/auth/login
 */
authRouter.post("/login", authController.loginController ); //login controller

/**
 * @route GET /api/auth/get-me
 * @desc Get the currently logged in user's information
 * @access Private
 */
authRouter.get("/get-me",identifyUser,authController.getMeController)

module.exports = authRouter; //export auth router