import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getAllPosts } from "../controllers/post.controller.js";

const router = Router()

router.get('/:class_code', verifyToken, getAllPosts)


export default router

