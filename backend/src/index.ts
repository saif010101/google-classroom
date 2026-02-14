import express from "express";
import cors from "cors";
import classRouter from './routes/class.routes.js'

export const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/classes', classRouter)