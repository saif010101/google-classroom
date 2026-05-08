import axios from 'axios'

export const deleteClass = async (class_code: string) => {
    const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/classes/delete`, {
        withCredentials: true, params: {
            class_code
        }
    })
    return data
}