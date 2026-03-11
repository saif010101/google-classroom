import type { Request, Response } from "express";
import classService from "../services/ClassService.js";



export const getAllClasses = async (req: Request, res: Response) => {
    const { user_id } = req.user

    setTimeout(async () => {
        try {
            const { rows } = await classService.getClasses(user_id)
            res.status(200).json(rows)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }

    }, 100
    )
}

export const createClass = async (req: Request, res: Response) => {
    const { user_id } = req.user
    const { name, section } = req.body
    try {
        await classService.createClass(user_id, name, section)
        res.status(201).json({ message: 'Class created successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' })
        console.error(error)
    }

}

export const deleteClass = async (req: Request, res: Response) => {
    const { class_code } = req.query
    if (!class_code || Array.isArray(class_code) || typeof class_code !== 'string') {
        return res.status(400).json({ message: 'Required parameters missing' })
    }
    try {
        const result = await classService.deleteClass(class_code)

        if (result.rowCount === 1) {
            res.status(200).json({ message: 'Class deleted successfully' })
        } else {
            res.status(404).json({ message: 'Class not found' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const joinClass = async (req: Request, res: Response) => {
    const { class_code } = req.body
    const { user_id } = req.user
    if (!class_code) {
        return res.status(400).json({ message: 'Bad Request' })
    }
    try {
        const response = await classService.joinClass(user_id, class_code)
        return res.status(200).json({ message: 'Class joined successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error.' })
    }
}

export const leaveClass = async (req: Request, res: Response) => {
    const { user_id } = req.user
    const { class_code } = req.body
    if (!class_code) {
        return res.status(400).json({ message: 'Bad Request' })
    }
    try {
        const response = await classService.leaveClass(user_id, class_code)
        return res.status(200).json({ message: 'Class unenrolled successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error.' })
    }
}

