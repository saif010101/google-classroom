import axios from 'axios'

export const deletePost = async (post_id: number) => {
    const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${post_id}`, {
        withCredentials: true})
    return data
}