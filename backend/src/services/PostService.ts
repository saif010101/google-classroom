import { db } from "../utils/db.js";

class PostService {
    async getPosts(class_code : string) {
        return await db.query(`select p.post_id,p.content,p.posted_at,first_name || ' ' || last_name as full_name 
            from posts as p inner join users as u 
            on p.user_id = u.user_id where class_code = $1`,[class_code])
    }
}


export default new PostService()