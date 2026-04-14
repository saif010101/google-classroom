import { db } from "../utils/db.js";

class CommentService {
    async getCommentsByPost(post_id: number) {
        return await db.query(`select u.user_id,c.comment_id,c.content,c.posted_at,u.first_name || ' ' || u.last_name as name 
            from comments as c inner join users as u on c.user_id = u.user_id 
            where c.post_id = $1 order by posted_at desc`, [post_id])
    }

    async createComment(post_id: number, user_id: number, content: string) {
        return await db.query(`insert into comments (post_id,user_id,content)
            values ($1,$2,$3)`, [post_id, user_id, content])
    }

    async getAuthorId(comment_id: number) {
        const { rows } = await db.query(`select user_id from comments where comment_id = $1`, [comment_id])
        return rows[0] ? rows[0].user_id : null
    }
    async deleteComment(comment_id: number) {
        return await db.query(`delete from comments where comment_id = $1`, [comment_id])
    }

}

export default new CommentService()