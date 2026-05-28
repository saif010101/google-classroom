import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getAllMaterials, getMaterial } from "../controllers/material.controller.js";

const router = Router()

router.get('/posts/:post_id', verifyToken, getAllMaterials)
router.get('/:material_id', verifyToken, getMaterial)


export default router

