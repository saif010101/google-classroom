import { useQuery } from "@tanstack/react-query"
import { getAllClasses } from "../api/getAllClasses.ts"


export const useClassData = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['classData'],
        queryFn: getAllClasses
    })

    return { data, isLoading }
}
