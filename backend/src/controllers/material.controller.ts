import type { Request, Response } from "express";
import materialService from "../services/MaterialService.js";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    }
})

const command = new GetObjectCommand({
    Bucket: 'aws-s3-gcr',
    Key: 'hello.pdf'
})


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
