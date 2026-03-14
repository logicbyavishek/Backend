const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json()) //middleware for read json value in request.body without this output is undefined
app.use(cookieParser()) //middleware for read cookie value in request.cookie

/* Require Router*/
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/posts.routes")
const userRouter = require("./routes/users.routes")

/* Use Routes*/
app.use("/api/auth",authRouter) //middleware for read auth routes
app.use("/api/posts",postRouter) //middleware for read post routes
app.use("/api/users",userRouter) // middleware for read user routes

module.exports=app