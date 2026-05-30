import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createMaterial, getAllMaterials, getMaterial, getUploadUrl } from "../controllers/material.controller.js";

const router = Router()

router.get('/posts/:post_id', verifyToken, getAllMaterials)
router.get('/:material_id', verifyToken, getMaterial)
router.get('/upload/url', verifyToken, getUploadUrl)
router.post('/', verifyToken, createMaterial)


export default router

