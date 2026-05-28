import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getAllMaterials } from "../controllers/material.controller.js";

const router = Router()

router.get('/post/:post_id', verifyToken, getAllMaterials)
// router.get('/:material_id', verifyToken, getMaterial)


export default router

