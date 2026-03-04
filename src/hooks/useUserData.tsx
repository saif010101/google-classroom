import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/getUser.ts"

export const useUserData = () => {
    const { data,isSuccess,isPending,isError,refetch } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
        retry : false
    })
    return { data,isSuccess,isPending,isError,refetch }
}
