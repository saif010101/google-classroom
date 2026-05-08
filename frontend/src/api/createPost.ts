import axios from 'axios'


export const createPost = async (class_code: string | undefined, content: string) => {
    if (!class_code) {
        return null
    }
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/${class_code}`, { content }, { withCredentials: true })
    return data[0]
}