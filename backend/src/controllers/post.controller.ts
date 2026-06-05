import type { Request, Response } from "express";
import postService from "../services/PostService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import materialService from "../services/MaterialService.js";
import { db } from "../utils/db.js";


export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
    const { class_code } = req.params
    if (!class_code || Array.isArray(class_code) || typeof class_code !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }
    const { rows } = await postService.getPosts(class_code)
    return res.status(200).json(rows)
})

export const createPost = asyncHandler(async (req: Request, res: Response) => {
    const { class_code } = req.params
    const { content } = req.body
    const { user_id } = req.user
    if (!class_code || Array.isArray(class_code) || typeof class_code !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }
    if (content.trim().length === 0) {
        return res.status(400).json({ message: 'Body is empty.' })
    }
    const { rows } = await postService.createPost(user_id, content.trim(), class_code)
    const { post_id } = rows[0]
    return res.status(201).json({ post_id, message: 'Post created successfully.' })
})

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { post_id } = req.params

    if (!post_id || Array.isArray(post_id) || typeof post_id !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }


    const parsedId = parseInt(post_id, 10)
    const result = await postService.deletePost(parsedId)

    if (result && result.rowCount && result.rowCount > 0) {
        return res.status(200).json({ message: 'Post deleted successfully.' })
    }

    return res.status(404).json({ message: 'Post not found.' })
})

export const editPost = asyncHandler(async (req: Request, res: Response) => {
    const { post_id } = req.params
    const { content } = req.body
    if (!post_id || Array.isArray(post_id) || typeof post_id !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }
    const { rowCount } = await postService.editPost(content, Number(post_id))
    if (rowCount && rowCount > 0) {
        return res.status(200).json({ message: 'Post updated successfully.' })
    }
    return res.status(404).json({ message: 'Post not found.' })
})

export const getAISummary = asyncHandler(async (req: Request, res: Response) => {
    const { content } = req.body

    if (!content) {
        return res.status(400).json({ message: 'Invalid Input.' })
    }
    const summary = await postService.getAISummary(content)
    return res.status(200).json({ summary })

})