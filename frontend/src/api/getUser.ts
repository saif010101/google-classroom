import axios from 'axios'
import { type UserData } from '../types/UserData'

export const getUser = async (): Promise<UserData> => {

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/`, { withCredentials: true })
    return data
}