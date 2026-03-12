import { Router } from "express";
import { createClass, getAllClasses, deleteClass, joinClass, leaveClass, getClass } from "../controllers/class.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router()

router.get('/', verifyToken, getAllClasses)
router.get('/:class_code', verifyToken, getClass)
router.post('/create', verifyToken, createClass)
router.delete('/delete', verifyToken, deleteClass)
router.post('/unenroll', verifyToken, leaveClass)
router.post('/join', verifyToken, joinClass)

export default router
