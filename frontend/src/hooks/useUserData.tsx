import { useQuery } from "@tanstack/react-query"
import { UsersAPIService } from "../api/UsersAPIService"

export const useUserData = () => {
    const { data, isSuccess, isPending, isError, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: UsersAPIService.getUser,
        retry : false
    })
    return { data, isSuccess, isPending, isError, refetch }
}
