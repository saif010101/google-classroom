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
            console.error('Error in getCommentsByPost controller : ', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }, 2000)

}

export const createComment = async (req: Request, res: Response) => {

    const { post_id, content } = req.body
    const { user_id } = req.user

    if (!post_id || !content || !content.trim()) {
        return res.status(400).json({ message: 'Required data missing' })
    }

    setTimeout(async () => {
        try {
            const { rows } = await commentService.createComment(Number(post_id), Number(user_id), content)
            return res.status(201).json(rows)
        } catch (error) {
            console.error('Error in createComment controller : ', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }, 2000)

}
