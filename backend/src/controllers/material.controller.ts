import type { Request, Response } from "express";
import materialService from "../services/MaterialService.js";




export const getAllMaterials = async (req: Request, res: Response) => {
    const { post_id } = req.params

    if (!post_id || Array.isArray(post_id)) {
        return res.status(400).json({ message: 'Invalid data' })
    }

    try {
        const result = await materialService.getMaterialsByPost(parseInt(post_id, 10))
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }

}

export const getMaterial = async (req: Request, res: Response) => {
    const { material_id } = req.params

    if (!material_id || Array.isArray(material_id)) {
        return res.status(400).json({ message: 'Invalid data' })
    }

    try {

        const result = await materialService.getMaterial(parseInt(material_id, 10))

        // if material_id does not exist in database
        if (!result) {
            return res.status(404).json({ message: 'Material not found.' })
        }

        const { s3_key, s3_bucket } = result
        const url = await materialService.createPresignedUrl(s3_bucket as string, s3_key as string)

        return res.status(200).json(url)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }

}

// TODO : create a method in materialService that will create a presigned url.
