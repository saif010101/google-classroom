import axios from 'axios'

interface CommentData {
    comment_id : number,
    content : string
}

export const editComment = async (payload : CommentData) => {
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/api/comments/`, payload, { withCredentials: true })
    return data[0]
}