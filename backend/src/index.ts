import express from "express";
import cors from "cors";
import classRouter from './routes/class.routes.js'
import userRouter from './routes/user.routes.js'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"


export const app = express();
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


app.use('/api/classes', classRouter)
app.use('/api/users', userRouter)