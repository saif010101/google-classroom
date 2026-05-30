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

export const createPost = async (req: Request, res: Response) => {
    const { class_code } = req.params
    const { content } = req.body
    const { user_id } = req.user
    if (!class_code || Array.isArray(class_code) || typeof class_code !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }


    try {
        const { rows } = await postService.createPost(user_id, content.trim(), class_code)
        const { post_id } = rows[0]
        res.status(201).json({ post_id , message: 'Post created successfully.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }


}

export const deletePost = async (req: Request, res: Response) => {

    const { post_id } = req.params

    if (!post_id || Array.isArray(post_id) || typeof post_id !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }

    try {
        const { rowCount } = await postService.deletePost(Number(post_id))
        if (rowCount && rowCount > 0) {
            res.status(200).json({ message: 'Post deleted successfully.' })
        } else {
            res.status(404).json({ message: 'Post not found.' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }


}

export const editPost = async (req: Request, res: Response) => {
    const { post_id } = req.params
    const { content } = req.body
    if (!post_id || Array.isArray(post_id) || typeof post_id !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }

    try {
        const { rowCount } = await postService.editPost(content, Number(post_id))

        if (rowCount && rowCount > 0) {
            res.status(200).json({ message: 'Post updated successfully.' })
        } else {
            res.status(404).json({ message: 'Post not found.' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }


}
