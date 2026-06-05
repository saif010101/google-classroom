import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createPost,getAllPosts,deletePost,editPost, getAISummary } from "../controllers/post.controller.js";

const router = Router()

router.get('/:class_code', verifyToken, getAllPosts)
router.post('/:class_code', verifyToken, createPost)
router.delete('/:post_id', verifyToken, deletePost)
router.patch('/:post_id',verifyToken,editPost)
router.post('/ai/summary',verifyToken,getAISummary) 

export default router

