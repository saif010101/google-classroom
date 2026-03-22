import type { Request, Response } from "express";
import postService from "../services/PostService.js";


export const getAllPosts = async (req: Request, res: Response) => {
    const { class_code } = req.params
    if (!class_code || Array.isArray(class_code) || typeof class_code !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }
    try {
        const { rows } = await postService.getPosts(class_code)
        res.status(200).json(rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }

}
