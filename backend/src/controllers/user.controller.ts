import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userService from "../services/UserService.js";


export const getUser = async (req: Request, res: Response) => {

    const { user_id } = req.user

    try {

        const user = await userService.getUserById(user_id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const createUser = async (req: Request, res: Response) => {

    const { first_name, last_name, email, password } = req.body

    try {
        if (!first_name || !last_name || !email || !password) {
            res.status(401).json({ message: 'Invalid input format' })
        }

        await userService.createUser({ first_name, last_name, email, password })

        res.status(201).json({
            message: 'User created successfully',
            data: {
                first_name,
                last_name,
                email
            }
        })


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {
        const user = await userService.getUserByEmail(email)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const passwordMatches = await userService.matchPassword(password, user.password)

        if (!passwordMatches) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        const token = userService.generateJwtToken(user.user_id)

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false
        }).status(200).json({ message: 'Login successful' })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server' })
    }
}

