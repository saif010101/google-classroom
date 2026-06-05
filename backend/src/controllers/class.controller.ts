import type { Request, Response } from "express";
import classService from "../services/ClassService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllClasses = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.user
    const { rows } = await classService.getClasses(user_id)
    res.status(200).json(rows)
})

export const getClass = asyncHandler(async (req: Request, res: Response) => {
    const { class_code } = req.params
    if (!class_code || Array.isArray(class_code) || typeof class_code !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }
    const { rows } = await classService.getClass(class_code)
    res.status(200).json(rows[0])
})

export const getPeople = asyncHandler(async (req: Request, res: Response) => {
    const { class_code } = req.params
    if (!class_code || Array.isArray(class_code) || typeof class_code !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }
    const { rows } = await classService.getPeople(class_code)
    res.status(200).json(rows)
})

export const createClass = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.user
    const { name, section } = req.body

    if (!name || !section || name.length > 50 || section.length > 25) {
        return res.status(400).json({ message: 'Characters limit exceeded in input field' })
    }
    await classService.createClass(user_id, name, section)
    res.status(201).json({ message: 'Class created successfully' })
})

export const deleteClass = asyncHandler(async (req: Request, res: Response) => {
    const { class_code } = req.query
    if (!class_code || Array.isArray(class_code) || typeof class_code !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }
    const result = await classService.deleteClass(class_code)
    if (result.rowCount === 1) {
        return res.status(200).json({ message: 'Class deleted successfully' })
    }
    return res.status(404).json({ message: 'Class not found' })
})

export const joinClass = asyncHandler(async (req: Request, res: Response) => {
    const { class_code } = req.body
    const { user_id } = req.user
    if (!class_code || class_code.length !== 6) {
        return res.status(400).json({ message: 'Invalid Input' })
    }
    const { rows } = await classService.getClass(class_code)

    // if class does not exists
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Class not found.' })
    }

    await classService.joinClass(user_id, class_code)
    return res.status(200).json({ message: 'Class joined successfully' })
})

export const leaveClass = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.user
    const { class_code } = req.body
    if (!class_code) {
        return res.status(400).json({ message: 'Bad Request' })
    }
    await classService.leaveClass(user_id, class_code)
    return res.status(200).json({ message: 'Class unenrolled successfully' })
})

export const updateClass = asyncHandler(async (req: Request, res: Response) => {
    const { name, section } = req.body
    const { user_id } = req.user
    const { class_code } = req.params

    if (!name || !section) {
        return res.status(400).json({ message: 'Inputs missing' })
    }
    if (!class_code || Array.isArray(class_code) || typeof class_code !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }

    const { rows } = await classService.getUserRole(user_id, class_code)
    if (rows.length === 0 || rows[0].role !== 'teacher') {
        return res.status(403).json({ message: 'Forbidden' })
    }

    await classService.updateClass(class_code, name, section)
    res.status(200).json({ message: 'Class details updated successfully.' })
})