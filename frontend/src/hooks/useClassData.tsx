import { useQuery } from "@tanstack/react-query"
import { ClassAPIService } from "../api/ClassAPIService"



export const useClassData = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['classData'],
        queryFn: ClassAPIService.getAllClasses
    })

    return { data, isLoading }
}
