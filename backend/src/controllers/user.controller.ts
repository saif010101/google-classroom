import type { Request, Response } from "express";
import userService from "../services/UserService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const jwtOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
}

export const getUser = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.user
    const user = await userService.getUserById(user_id)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json(user)
})

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'Invalid input format' })
    }
    await userService.createUser({ first_name, last_name, email, password })
    return res.status(201).json({
        message: 'User created successfully',
        data: { first_name, last_name, email }
    })
})

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await userService.getUserByEmail(email)
    if (!user) {
        return res.status(404).json({ message: 'This user does not exist.' })
    }
    const passwordMatches = await userService.matchPassword(password, user.password)
    if (!passwordMatches) {
        return res.status(401).json({ message: 'The password is invalid' })
    }
    const token = userService.generateJwtToken(user.user_id)


    return res.cookie('jwt', token, jwtOptions)
        .status(200).json({ message: 'Login successful' })
})

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
    return res.status(200).clearCookie("jwt", jwtOptions).json({
        message: 'User logged out.'
    })
})