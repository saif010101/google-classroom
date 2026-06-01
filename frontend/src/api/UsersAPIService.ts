import axios from 'axios'
import { type UserData } from '../types/UserData'

interface LoginPayload {
    email: string
    password: string
}

interface CreateUserPayload {
    first_name: string
    last_name: string
    email: string
    password: string
}

export class UsersAPIService {
    private static baseUrl = `/api/users`

    static async loginUser(payload: LoginPayload) {
        const { data } = await axios.post(`${UsersAPIService.baseUrl}/login`, payload, { withCredentials: true })
        return data[0]
    }

    static async getUser(): Promise<UserData> {
        console.log(UsersAPIService.baseUrl)
        const { data } = await axios.get(`${UsersAPIService.baseUrl}/`, { withCredentials: true })
        return data
    }

    static async createUser(payload: CreateUserPayload) {
        const { data } = await axios.post(`${UsersAPIService.baseUrl}/signup`, payload, { withCredentials: true })
        return data[0]
    }
}
