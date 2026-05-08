import axios from 'axios'
import type { CommentType } from '../types/CommentType'

export const getComments = async (post_id: number) : Promise<CommentType[] | null> => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/${post_id}`, { withCredentials: true })
    return data
}