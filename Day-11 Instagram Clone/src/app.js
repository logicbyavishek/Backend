const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")


const app = express()

app.use(express.json()) //middleware for read json value in request.body without this output is undefined
app.use(cookieParser()) //middleware for read cookie value in request.cookie
app.use("/api/auth",authRouter) //middleware for read auth routes

module.exports=app