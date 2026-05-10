import axios from 'axios'
import type { CommentType } from '../types/CommentType'

interface EditCommentPayload {
    comment_id: number
    content: string
}

export class CommentsAPIService {
    private static baseUrl = `http://${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_BACKEND_PORT}/api/comments`

    static async getComments(post_id: number): Promise<CommentType[] | null> {
        const { data } = await axios.get(`${CommentsAPIService.baseUrl}/${post_id}`, { withCredentials: true })
        return data
    }

    static async createComment(post_id: number, content: string) {
        const { data } = await axios.post(`${CommentsAPIService.baseUrl}/`, { post_id, content }, { withCredentials: true })
        return data[0]
    }

    static async editComment(payload: EditCommentPayload) {
        const { data } = await axios.patch(`${CommentsAPIService.baseUrl}/`, payload, { withCredentials: true })
        return data[0]
    }

    static async deleteComment(comment_id: number) {
        const { data } = await axios.delete(`${CommentsAPIService.baseUrl}/${comment_id}`, { withCredentials: true })
        return data
    }
}
