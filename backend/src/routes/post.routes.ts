import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createPost,getAllPosts,deletePost } from "../controllers/post.controller.js";

const router = Router()

router.get('/:class_code', verifyToken, getAllPosts)
router.post('/:class_code', verifyToken, createPost)
router.delete('/:post_id', verifyToken, deletePost)


export default router

