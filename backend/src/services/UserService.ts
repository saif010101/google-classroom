import bcrypt from "bcrypt"
import { db } from "../utils/db.js";
import jwt from "jsonwebtoken"

interface CreateUserParams {
    first_name: string
    last_name: string
    email: string
    password: string
}

class UserService {

    async createUser({ first_name, last_name, email, password }: CreateUserParams) {

        const hashedPassword = await bcrypt.hash(password, 10)
        const { rows } = await db.query(`insert into users (first_name,last_name,email,password) 
                           values ($1,$2,$3,$4)`,
            [first_name, last_name, email, hashedPassword])
        return rows[0]
    }

    async getUserById(id: string | string[] | undefined) {
        const { rows } = await db.query(`select user_id,first_name || ' ' || last_name as full_name,email
                               from users where user_id = $1`, [id])

        return rows.length > 0 ? rows[0] : null
    }

    async getUserByEmail(email: string) {
        const { rows } = await db.query(`select user_id,password from users where email = $1`, [email])
        return rows.length > 0 ? rows[0] : null
    }

    async matchPassword(password: string, userPassword: string) {
        return await bcrypt.compare(password, userPassword)
    }

    generateJwtToken(user_id: number) {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT Secret key not defined!")
        }
        return jwt.sign({ user_id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
    }
}


export default new UserService()