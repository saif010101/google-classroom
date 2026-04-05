import axios from 'axios'


export const editPost = async (post_id : number,content : string) => {
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/api/posts/${post_id}`, { content }, { withCredentials: true })
    return data[0]
}