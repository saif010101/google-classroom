import type { Request, Response } from "express";
import materialService from "../services/MaterialService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllMaterials = asyncHandler(async (req: Request, res: Response) => {
    const { post_id } = req.params
    if (!post_id || Array.isArray(post_id)) {
        return res.status(400).json({ message: 'Invalid data' })
    }
    const result = await materialService.getMaterialsByPost(parseInt(post_id, 10))
    return res.status(200).json(result)
})

export const getMaterial = asyncHandler(async (req: Request, res: Response) => {
    const { material_id } = req.params
    if (!material_id || Array.isArray(material_id)) {
        return res.status(400).json({ message: 'Invalid data' })
    }
    const result = await materialService.getMaterial(parseInt(material_id, 10))
    if (!result) {
        return res.status(404).json({ message: 'Material not found.' })
    }
    const { s3_key, s3_bucket } = result
    const url = await materialService.createPresignedUrl(s3_bucket as string, s3_key as string)
    return res.status(200).json({ url })
})

export const getUploadUrl = asyncHandler(async (req: Request, res: Response) => {
    const { file_name, content_type, class_name } = req.query
    if (!file_name || !content_type || !class_name) {
        return res.status(400).json({ message: 'Parameters missing or invalid.' })
    }
    const s3_key = `${class_name}/${file_name}`
    const url = await materialService.createUploadUrl(
        process.env.AWS_BUCKET_NAME!,
        s3_key as string,
        content_type as string
    )
    return res.status(200).json({ url })
})

export const createMaterial = asyncHandler(async (req: Request, res: Response) => {
    const { file_name, file_type, class_name, post_id } = req.body
    if (!file_name || !post_id || !file_type) {
        return res.status(400).json({ message: 'Parameters missing or invalid.' })
    }
    await materialService.createMaterial(file_name, file_type, post_id, class_name, process.env.AWS_BUCKET_NAME!)
    return res.status(201).json({ message: 'Material created successfully.' })
})

export const deleteAllMaterials = asyncHandler(async (req: Request, res: Response) => {
    const { post_id } = req.params
    if (!post_id) {
        return res.status(400).json({ message: 'Parameters missing or invalid.' })
    }
    const materials = await materialService.getMaterialsByPost(parseInt(post_id as string, 10))
    if (materials.length === 0) {
        return res.status(200).json({ message: 'No materials attached to this post.' })
    }
    await materialService.deleteMaterials(materials, process.env.AWS_BUCKET_NAME!)
    return res.status(200).json(materials)
})