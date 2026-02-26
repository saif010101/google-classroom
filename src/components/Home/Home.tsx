import { ClassCard } from "../ClassCard.tsx"
import { useClassData } from "../../hooks/useClassData.tsx"


export const Home = () => {
    const { data } = useClassData()
    return (
        <>
            <div className="p-4 grid min-[668px]:grid-cols-2 gap-3 items-center ">
                {data?.map(item => (
                    <ClassCard key={item.class_code} courseName={item.class_name} teacherName={item.teacher_name} section={item.section} />
                ))}
            </div>
        </>
    )
}
