import bcrypt from "bcrypt"
import { db } from "../utils/db.js";

interface createUserParams {
    first_name: string
    last_name: string
    email: string
    password: string
}

class UserService {

    async createUser({ first_name, last_name, email, password }: createUserParams) {

        const hashedPassword = await bcrypt.hash(password, 10)
        const { rows } = await db.query(`insert into users (first_name,last_name,email,password) 
                           values ($1,$2,$3,$4)`,
            [first_name, last_name, email, hashedPassword])
        return rows[0]
    }

    async getUserById(id: string | string[] | undefined) {
        const { rows } = await db.query(`select first_name || ' ' || last_name as full_name,email
                               from users where user_id = $1`, [id])
        
        return rows.length > 0 ? rows[0] : null
    }

    async getUserByEmail(email : string){
        const { rows } = await db.query(`select user_id,password from users where email = $1`, [email])
        return rows.length > 0 ? rows[0] : null
    }
}


export default new UserService()