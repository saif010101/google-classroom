import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getCommentsByPost,createComment } from "../controllers/comments.controller.js";


const router = Router()

router.get('/:post_id', verifyToken, getCommentsByPost)
router.post('/', verifyToken, createComment)

export default router

