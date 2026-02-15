import axios from 'axios'
import { type ClassData } from '../types/ClassData'

export const getAllClasses = async (): Promise<ClassData[]> => {
    const { data } = await axios.get('http://localhost:3000/api/classes/')
    return data
}