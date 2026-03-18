import { Router } from "express";
import { createClass, getAllClasses, deleteClass, joinClass, leaveClass, getClass, getPeople, updateClass } from "../controllers/class.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router()

router.get('/', verifyToken, getAllClasses)
router.get('/:class_code', verifyToken, getClass)
router.get('/people/:class_code', verifyToken, getPeople)
router.delete('/delete', verifyToken, deleteClass) // maybe pass class_code as params
router.post('/create', verifyToken, createClass)
router.post('/unenroll', verifyToken, leaveClass) // maybe change this to delete later
router.post('/join', verifyToken, joinClass)
router.patch('/update/:class_code',verifyToken,updateClass) // PATCH /api/classes/update/CS101

export default router

