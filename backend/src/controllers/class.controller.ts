import type { Request, Response } from "express";
import classService from "../services/ClassService.js";


export const getAllClasses = async (req: Request, res: Response) => {
    try {
        const { rows } = await classService.getClasses() 
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}



