import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getCommentsByPost } from "../controllers/comments.controller.js";


const router = Router()

router.get('/:post_id', verifyToken, getCommentsByPost)

export default router

