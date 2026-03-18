const express = require("express")
const cookieParser = require("cookie-parser")
const CORS = require("cors")

const app = express()

app.use(express.json()) //middleware for read json value in request.body without this output is undefined
app.use(cookieParser()) //middleware for read cookie value in request.cookie
app.use(CORS({
    credentials:true, //for backend create cookies in frontend
    origin:"http://localhost:5173"
})) //middleware for cors 
/**
 * Access to XMLHttpRequest at 'http://localhost:3000/api/auth/register' from origin 'http://localhost:5173' has been blocked by CORS policy: 
 * Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested 
 * resource.
 */

/* Require Router*/
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/posts.routes")
const userRouter = require("./routes/users.routes")

/* Use Routes*/
app.use("/api/auth",authRouter) //middleware for read auth routes
app.use("/api/posts",postRouter) //middleware for read post routes
app.use("/api/users",userRouter) // middleware for read user routes

module.exports=app