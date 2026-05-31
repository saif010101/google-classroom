import type { Request, Response } from "express";
import commentService from "../services/CommentService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCommentsByPost = asyncHandler(async (req: Request, res: Response) => {
    const { post_id } = req.params
    if (Array.isArray(post_id) || !post_id || !post_id.trim()) {
        return res.status(400).json({ message: 'Required parameters missing' })
    }
    const { rows } = await commentService.getCommentsByPost(Number(post_id))
    return res.status(200).json(rows)
})

export const createComment = asyncHandler(async (req: Request, res: Response) => {
    const { post_id, content } = req.body
    const { user_id } = req.user
    if (!post_id || !content || !content.trim()) {
        return res.status(400).json({ message: 'Required data missing' })
    }
    const { rows } = await commentService.createComment(Number(post_id), Number(user_id), content)
    return res.status(201).json(rows)
})

export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.user
    const { comment_id } = req.params
    if (!comment_id || Array.isArray(comment_id) || isNaN(parseInt(comment_id, 10))) {
        return res.status(400).json({ message: 'Invalid data' })
    }

    const parsedId = parseInt(comment_id, 10)

    const author_id = await commentService.getAuthorId(parsedId)
    if (!author_id) {
        return res.status(404).json({ message: 'Comment not found' })
    }
    if (author_id !== user_id) {
        return res.status(403).json({ message: 'Operation not permitted.' })
    }

    await commentService.deleteComment(parsedId)
    return res.status(200).json({ message: 'Comment deleted successfully.' })
})

export const editComment = asyncHandler(async (req: Request, res: Response) => {
    const { comment_id, content } = req.body
    const { user_id } = req.user
    if (!comment_id || !content || !content.trim()) {
        return res.status(400).json({ message: 'Required data missing' })
    }

    const parsedId = parseInt(comment_id, 10)

    const author_id = await commentService.getAuthorId(parsedId)
    if (!author_id) {
        return res.status(404).json({ message: 'Comment not found' })
    }
    if (author_id !== user_id) {
        return res.status(403).json({ message: 'Operation not permitted.' })
    }

    await commentService.editComment(parsedId, content)
    return res.status(200).json({ message: 'Comment updated successfully.' })
})