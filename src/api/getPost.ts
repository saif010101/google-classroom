import axios from 'axios'

interface PostType {
    user_id: number
    post_id: number
    content: string
    posted_at: string
    full_name: string
}

export const getPosts = async (class_code: string | undefined) : Promise<PostType[] | null> => {
    if (!class_code) {
        return null
    }
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${class_code}`, { withCredentials: true })
    return data
}