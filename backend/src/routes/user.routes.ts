import { Router } from "express";
import { getUser,createUser,loginUser } from "../controllers/user.controller.js";

const router = Router()

router.get('/:id', getUser)
router.post('/signup',createUser)
router.post('/login',loginUser)

export default router
