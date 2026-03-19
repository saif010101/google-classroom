import axios from 'axios'

interface ClassData {
    name: string
    section: string
}

export const editClass = async (class_code: string | undefined, payload: ClassData) => {
    if (!class_code){
        return null
    }
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/api/classes/update/${class_code}`, payload, { withCredentials: true })
    return data[0]
}