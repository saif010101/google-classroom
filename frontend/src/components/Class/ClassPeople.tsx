import { useQuery } from "@tanstack/react-query"
import { PeopleList } from "./PeopleList"
import { useParams } from "react-router"
import { getPeople } from "../../api/getPeople"
import type { PeopleType } from "../../types/PeopleType"

export const ClassPeople = () => {

    const { class_code } = useParams()

    const { data } = useQuery({
        queryKey: ['people', class_code],
        queryFn: () => getPeople(class_code)
    })

    console.log('people component', data)

    const students = data ? data.filter((item: PeopleType) => item.role === 'student') : []
    const teacher = data ? data.filter((item: PeopleType) => item.role === 'teacher') : []

    return (
        <section className="">
            <PeopleList heading="Teacher" data={teacher} />
            <PeopleList heading="Students" data={students} />
        </section>
    )
}
