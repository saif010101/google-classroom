import { ClassCard } from "../ClassCard.tsx"
import { useQuery } from "@tanstack/react-query"
import { getAllClasses } from "../../api/getAllClasses.js"

interface ClassData {
    teacher_name: string,
    class_name: string,
    section: string
}

export const Home = () => {
    const { data } = useQuery({
        queryKey: ['classData'],
        queryFn: getAllClasses
    })

    return (
        <>
            <div className="p-4 grid min-[668px]:grid-cols-2 gap-3 items-center ">
                {data?.data.map((item: ClassData) => (
                    <ClassCard courseName={item.class_name} teacherName={item.teacher_name} section={item.section} />
                ))}
            </div>
        </>
    )
}
