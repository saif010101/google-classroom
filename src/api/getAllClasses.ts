import axios from 'axios'

export const getAllClasses = async () => {
    return await axios.get('http://localhost:3000/api/classes/')
}