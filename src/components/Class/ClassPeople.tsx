import { PeopleList } from "./PeopleList"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { getClass } from "../../api/getClass.ts"
import { LinearProgress } from "@mui/material"
import { useClassContext } from "../../hooks/useClassContext.tsx"
import { useEffect } from "react"


export const ClassPeople = () => {
    const { class_code } = useParams()
    const { setCurrentClass } = useClassContext()

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['class'],
        queryFn: () => getClass(class_code)
    })

    useEffect(() => {
        if (isSuccess) {
            setCurrentClass(data)
        }
    }, [data])

    if (isLoading) {
        return <LinearProgress />
    }

    return (
        <section className="">
            <PeopleList heading="Teacher" />
            <PeopleList heading="Students" />
        </section>
    )
}
