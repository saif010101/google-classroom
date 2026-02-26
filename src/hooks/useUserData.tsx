import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/getUser.ts"

export const useUserData = (userId: Number) => {
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(userId)
    })
    return { data }
}
