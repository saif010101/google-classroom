import { db } from "../utils/db.js";

class PostService {
    async getPosts(class_code: string) {
        return await db.query(`select u.user_id,p.post_id,p.content,p.posted_at,first_name || ' ' || last_name as full_name 
            from posts as p inner join users as u 
            on p.user_id = u.user_id where class_code = $1 order by posted_at desc`, [class_code])
    }

    async createPost(user_id: number, content: string, class_code: string) {
        return await db.query(`insert into posts (content,class_code,user_id) values ($1,$2,$3) returning post_id`,
            [content, class_code, user_id])
    }

    async deletePost(post_id: number) {
        return await db.query(`delete from posts where post_id = $1`,
            [post_id])
    }

    async editPost(content: string, post_id: number) {
        return await db.query(`update posts set content = $1 where post_id = $2`,
            [content, post_id])
    }
}


export default new PostService()