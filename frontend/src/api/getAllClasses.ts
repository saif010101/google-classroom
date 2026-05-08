import axios from 'axios'
import { type ClassData } from '../types/ClassData'

export const getAllClasses = async (): Promise<ClassData[]> => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/classes/`,{withCredentials : true})
    return data
}