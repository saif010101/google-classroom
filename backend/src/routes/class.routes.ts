import { Router } from "express";
import { createClass, getAllClasses } from "../controllers/class.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router()

router.get('/', verifyToken, getAllClasses)
router.post('/create',verifyToken,createClass)

export default router
