import { db } from "../utils/db.js";

class CommentService {
    async getCommentsByPost(post_id : number) {
        return await db.query(`select u.user_id,c.comment_id,c.content,c.posted_at,u.first_name || ' ' || u.last_name as name 
            from comments as c inner join users as u on c.user_id = u.user_id 
            where c.post_id = $1 order by posted_at desc`, [post_id])
    }

}

export default new CommentService()