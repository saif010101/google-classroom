import { Router } from "express";
import { createClass, getAllClasses, deleteClass } from "../controllers/class.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router()

router.get('/', verifyToken, getAllClasses)
router.post('/create', verifyToken, createClass)
router.delete('/delete', verifyToken, deleteClass)

export default router
