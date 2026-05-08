import axios from 'axios'

interface ClassData {
    name: string
    section: string
}

export const createClass = async (payload: ClassData) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/classes/create`, payload, { withCredentials: true })
    return data[0]
}