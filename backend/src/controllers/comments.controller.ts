import type { Request, Response } from "express";
import commentService from "../services/CommentService.js";

export const getCommentsByPost = async (req: Request, res: Response) => {
    const { post_id } = req.params
    if (Array.isArray(post_id) || !post_id || !post_id.trim()) {
        return res.status(400).json({ message: 'Required parameters missing' })
    }


    try {
        const { rows } = await commentService.getCommentsByPost(Number(post_id))
        return res.status(200).json(rows)
    } catch (error) {
        console.error('Error in getCommentsByPost controller : ', error)
        return res.status(500).json({ message: 'Internal server error' })
    }


}

export const createComment = async (req: Request, res: Response) => {

    const { post_id, content } = req.body
    const { user_id } = req.user

    if (!post_id || !content || !content.trim()) {
        return res.status(400).json({ message: 'Required data missing' })
    }


    try {
        const { rows } = await commentService.createComment(Number(post_id), Number(user_id), content)
        return res.status(201).json(rows)
    } catch (error) {
        console.error('Error in createComment controller : ', error)
        return res.status(500).json({ message: 'Internal server error' })
    }

}

export const deleteComment = async (req: Request, res: Response) => {

    const { user_id } = req.user
    const { comment_id } = req.params

    if (!comment_id || Array.isArray(comment_id) || isNaN(parseInt(comment_id, 10))) {
        return res.status(400).json({ message: 'Invalid data' })
    }

    try {
        const author_id = await commentService.getAuthorId(parseInt(comment_id, 10))

        if (!author_id) {
            return res.status(404).json({ message: 'Comment not found' })
        }

        if (author_id !== user_id) {
            return res.status(403).json({ message: 'Operation not permitted.' })
        }

        await commentService.deleteComment(parseInt(comment_id, 10))

        return res.status(200).json({ message: 'Comment deleted successfully.' })
    } catch (error) {
        console.error('Error in deleteComment controller : ', error)
        return res.status(500).json({ message: 'Internal server error' })
    }

}

export const editComment = async (req: Request, res: Response) => {

    const { comment_id, content } = req.body
    const { user_id } = req.user

    if (!comment_id || !content || !content.trim()) {
        return res.status(400).json({ message: 'Required data missing' })
    }

    try {
        const author_id = await commentService.getAuthorId(parseInt(comment_id, 10))

        if (!author_id) {
            return res.status(404).json({ message: 'Comment not found' })
        }

        if (author_id !== user_id) {
            return res.status(403).json({ message: 'Operation not permitted.' })
        }

        await commentService.editComment(parseInt(comment_id, 10), content)
        return res.status(200).json({ message: 'Comment updated successfully.' })
    } catch (error) {
        console.error('Error in createComment controller : ', error)
        return res.status(500).json({ message: 'Internal server error' })
    }


}
