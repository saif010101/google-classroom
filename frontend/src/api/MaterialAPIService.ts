import axios from 'axios'
import type { MaterialType } from '../types/MaterialType'



export class MaterialAPIService {

    private static baseUrl = `http://localhost:3000/api/materials`


    static async getAllMaterials(post_id : number) : Promise<MaterialType[]>  {
        const { data } = await axios.get(`${MaterialAPIService.baseUrl}/posts/${post_id}`, { withCredentials: true })
        return data
    }

    static async getMaterial(material_id : number) : Promise<string>  {
        const { data } = await axios.get(`${MaterialAPIService.baseUrl}/${material_id}`, { withCredentials: true })
        return data.url
    }
}