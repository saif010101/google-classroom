import type { Request, Response } from "express";
import classService from "../services/ClassService.js";



export const getAllClasses = async (req: Request, res: Response) => {
    const { user_id } = req.user
    try {
        const { rows } = await classService.getClasses(user_id)
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
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



