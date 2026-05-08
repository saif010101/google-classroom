import axios from 'axios'

interface ClassData {
    class_code : string
}

export const leaveClass = async (payload: ClassData) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/classes/unenroll`, payload, { withCredentials: true })
    return data[0]
}