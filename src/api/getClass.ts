import axios from 'axios'

export const getClass = async (class_code: string) => {

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/classes/${class_code}`, { withCredentials: true })
    return data
}