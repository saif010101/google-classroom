import axios from 'axios'


export const createComment = async (post_id: number, content: string) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/comments/`, { post_id, content }, { withCredentials: true })
    return data[0]
}