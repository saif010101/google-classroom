import { Router } from "express";
import { getUser, createUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router()

router.get('/', verifyToken, getUser)
router.post('/signup', createUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

export default router
