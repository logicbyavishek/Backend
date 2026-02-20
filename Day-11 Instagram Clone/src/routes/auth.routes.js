const express = require("express");
const authController = require("../controller/auth.controller")

const authRouter = express.Router();

/**
 * post /api/auth/register
 */

authRouter.post("/register", authController.registerController );

/**
 * login /api/auth/login
 */
authRouter.post("/login", authController.loginController );

module.exports = authRouter;