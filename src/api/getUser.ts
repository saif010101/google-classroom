import axios from 'axios'
import { type UserData } from '../types/UserData'

export const getUser = async (id: Number): Promise<UserData> => {

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`)
    return data
}