import bcrypt from "bcrypt"
import { db } from "../utils/db.js";
import jwt from "jsonwebtoken"

class MaterialService {

    async getMaterialsByPost(post_id: number) {
        console.log(post_id)
        const { rows } = await db.query(`select material_id,file_name from materials where post_id = $1`,
            [post_id])
        return rows
    }

}
 

export default new MaterialService()