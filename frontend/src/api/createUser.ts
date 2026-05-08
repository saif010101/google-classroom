import axios from 'axios'

interface UserData {
    first_name: string
    last_name: string
    email: string
    password: string
}

export const createUser = async (payload: UserData) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/signup`, payload, { withCredentials: true })
    return data[0]
}