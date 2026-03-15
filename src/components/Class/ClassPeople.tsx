import { useQuery } from "@tanstack/react-query"
import { PeopleList } from "./PeopleList"
import { useParams } from "react-router"
import { getPeople } from "../../api/getPeople"

export const ClassPeople = () => {

    const { class_code } = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ['people'],
        queryFn: () => getPeople(class_code)
    })

    const students = data ? data.filter(item  => item.role === 'student') : []
    const teacher = data ? data.filter(item => item.role === 'teacher') : []

    return (
        <section className="">
            <PeopleList heading="Teacher"  data={teacher}/>
            <PeopleList heading="Students" data={students}/>
        </section>
    )
}
