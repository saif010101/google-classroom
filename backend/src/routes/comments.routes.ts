import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getCommentsByPost,createComment, deleteComment } from "../controllers/comments.controller.js";


const router = Router()

router.get('/:post_id', verifyToken, getCommentsByPost)
router.post('/', verifyToken, createComment)
router.delete('/:comment_id',verifyToken,deleteComment)

export default router

