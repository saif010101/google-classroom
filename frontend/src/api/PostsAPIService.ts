import axios from 'axios'

interface PostType {
    user_id: number
    post_id: number
    content: string
    posted_at: string
    full_name: string
}

export class PostsAPIService {
    private static baseUrl = `/api/posts`

    static async getPosts(class_code: string | undefined): Promise<PostType[] | null> {
        if (!class_code) {
            return null
        }
        const { data } = await axios.get(`${PostsAPIService.baseUrl}/${class_code}`, { withCredentials: true })
        return data
    }

    static async createPost(class_code: string | undefined, content: string) {
        if (!class_code) {
            return null
        }
        const { data } = await axios.post(`${PostsAPIService.baseUrl}/${class_code}`, { content }, { withCredentials: true })
        return data
    }

    static async editPost(post_id: number, content: string) {
        const { data } = await axios.patch(`${PostsAPIService.baseUrl}/${post_id}`, { content }, { withCredentials: true })
        return data[0]
    }

    static async deletePost(post_id: number) {
        const { data } = await axios.delete(`${PostsAPIService.baseUrl}/${post_id}`, { withCredentials: true })
        return data
    }

    static async getPostSummary(content: string) {
        const { data } = await axios.post(`${PostsAPIService.baseUrl}/ai/summary`, { content }, { withCredentials: true })
        return data
    }
}
