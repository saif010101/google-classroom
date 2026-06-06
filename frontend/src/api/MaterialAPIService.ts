import axios, { type GenericAbortSignal } from 'axios'
import type { MaterialType } from '../types/MaterialType'



export class MaterialAPIService {

    private static baseUrl = `http://localhost:3000/api/materials`


    static async getAllMaterials(post_id: number): Promise<MaterialType[]> {
        const { data } = await axios.get(`${MaterialAPIService.baseUrl}/posts/${post_id}`, { withCredentials: true })
        return data
    }

    static async getMaterial(material_id: number): Promise<string> {
        const { data } = await axios.get(`${MaterialAPIService.baseUrl}/${material_id}`, { withCredentials: true })
        return data.url
    }

    static async getUploadUrl(class_name: string, file_name: string, content_type: string): Promise<string> {
        const { data } = await axios.get(`${MaterialAPIService.baseUrl}/upload/url`, {
            withCredentials: true,
            params: {
                class_name, file_name, content_type
            }
        })
        return data.url
    }

    static async uploadData(url: string, file: File, setProgress: (value: number) => void, signal: GenericAbortSignal) {
        const res = await axios.put(url, file, {
            withCredentials: true,
            onUploadProgress: (e) => {
                setProgress(e.progress ? Math.round(e.progress * 100) : 0)
            },
            signal
        })
        return res
    }

    static async createMaterial(file_name: string, file_type: string, class_name: string, post_id: number) {
        const res = await axios.post(`${MaterialAPIService.baseUrl}/`, { file_name, file_type, class_name, post_id }, {
            withCredentials: true,
        })
        return res
    }
}