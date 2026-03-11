import axios from 'axios'

interface ClassData {
    class_code : string
}

export const joinClass = async (payload: ClassData) => {
    console.log(payload)
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/classes/join`, payload, { withCredentials: true })
    return data[0]
}