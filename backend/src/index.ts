import express from "express";
import cors from "cors";
import classRouter from './routes/class.routes.js'
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import commentRouter from './routes/comments.routes.js'
import materialRouter from './routes/material.route.js'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"

export const app = express();
app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.originalUrl}`)
  next()
})
app.use(cors({
    origin : `http://${process.env.ORIGIN}:5173`,
    credentials : true
}));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


app.use('/api/materials',materialRouter)
app.use('/api/classes', classRouter)
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments',commentRouter)