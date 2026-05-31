import type { Request, Response } from 'express'

export const asyncHandler = (fn: (req: Request, res: Response) => Promise<any>) => {

    return (req: Request, res: Response) => {
        fn(req, res).catch(error => {
            console.error(error)
            res.status(500).json({ message: 'Internal server error' })
        })
    }
}
