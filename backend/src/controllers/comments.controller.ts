import type { Request, Response } from "express";
import commentService from "../services/CommentService.js";

export const getCommentsByPost = async (req: Request, res: Response) => {
    const { post_id } = req.params
    if (Array.isArray(post_id) || !post_id || !post_id.trim()) {
        return res.status(400).json({ message: 'Required parameters missing' })
    }

    setTimeout(async () => {
        try {
            const { rows } = await commentService.getCommentsByPost(Number(post_id))
            return res.status(200).json(rows)
        } catch (error) {
            console.error('Error in getCommentsByPost controller : ',error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    },2000)

}
