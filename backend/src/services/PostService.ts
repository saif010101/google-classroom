import { db } from "../utils/db.js";
import materialService from "./MaterialService.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY!});

interface MaterialType {
    s3_key: string
}

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
        const client = await db.connect()
        try {
            client.query('begin;')
            const { rows } = await client.query(`select s3_key from materials where post_id = $1`, [post_id])
            const res = await client.query(`delete from posts where post_id = $1`,
                [post_id])
            if (rows.length > 0) {
                await materialService.deleteMaterials(rows as MaterialType[], process.env.AWS_BUCKET_NAME!)
            }
            await client.query('commit;')
            return res

        } catch (err) {
            console.error(err);
            await client.query('rollback;')
        }

        return null
    }

    async editPost(content: string, post_id: number) {
        return await db.query(`update posts set content = $1 where post_id = $2`,
            [content, post_id])
    }

    async getAISummary(content: string) {
        const response = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL as string,
            contents: `Summarize the following paragraph into a concise and 
            well-structured Urdu summary. The Urdu words should be very easy to understand. 
            Focus only on the key ideas and important information, 
            and keep the summary limited to a few clear sentences. 
            Return plain raw text only, written in Urdu, with no markdown, 
            HTML, bullet points, headings, labels, explanations, or 
            additional commentary.        \n ${content}`,
        });

        return response.text
    }
}


export default new PostService()