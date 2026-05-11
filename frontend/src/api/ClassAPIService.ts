import axios from 'axios'
import { type ClassData } from '../types/ClassData'

interface CreateClassType {
    name: string
    section: string
}

export class ClassAPIService {

    private static baseUrl = `/api/classes`


    static async getAllClasses(): Promise<ClassData[]> {
        const { data } = await axios.get(`${ClassAPIService.baseUrl}/`, { withCredentials: true })
        return data
    }

    static async getClass(class_code: string | undefined) {
        if (!class_code) {
            return null
        }
        const { data } = await axios.get(`${ClassAPIService.baseUrl}/${class_code}`, { withCredentials: true })
        return data
    }

    static async deleteClass(class_code: string) {
        const { data } = await axios.delete(`${ClassAPIService.baseUrl}/delete`, {
            withCredentials: true, params: {
                class_code
            }
        })
        return data
    }

    static async createClass(payload: CreateClassType) {
        const { data } = await axios.post(`${ClassAPIService.baseUrl}/create`, payload, { withCredentials: true })
        return data[0]
    }

    static async editClass(class_code: string | undefined, payload: CreateClassType) {
        if (!class_code) {
            return null
        }
        const { data } = await axios.patch(`${ClassAPIService.baseUrl}/update/${class_code}`, payload, { withCredentials: true })
        return data[0]
    }

    static async joinClass(payload: { class_code: string }) {
        const { data } = await axios.post(`${ClassAPIService.baseUrl}/join`, payload, { withCredentials: true })
        return data[0]
    }

    static async leaveClass(payload: { class_code: string }) {
        const { data } = await axios.post(`${ClassAPIService.baseUrl}/unenroll`, payload, { withCredentials: true })
        return data[0]
    }

    static async getPeople(class_code: string | undefined) {
        if (!class_code) {
            return null
        }
        const { data } = await axios.get(`${ClassAPIService.baseUrl}/people/${class_code}`, { withCredentials: true })
        return data
    }
}