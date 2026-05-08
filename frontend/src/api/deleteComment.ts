import axios from 'axios'

export const deleteComment = async (comment_id: number) => {
    const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/comments/${comment_id}`, {
        withCredentials: true
    })
    return data
}