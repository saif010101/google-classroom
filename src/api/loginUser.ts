import axios from 'axios'

interface UserData {
    email: string
    password: string
}

export const loginUser = async (payload: UserData) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, payload,{withCredentials: true})
    return data[0]
}