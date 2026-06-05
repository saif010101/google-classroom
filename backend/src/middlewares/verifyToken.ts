import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt

    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access' })
        }

        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("Secret key not defined in the environment variable")
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded
        next()
    } catch (error) {
        console.error(error)
    }


}