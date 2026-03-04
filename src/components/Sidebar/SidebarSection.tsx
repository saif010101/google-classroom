import { MiniClassCard } from "./MiniClassCard.tsx"
import { type ClassData } from "../../types/ClassData.ts"

interface SidebarSectionProps {
    title: string
    data: ClassData[] | undefined
}

export const SidebarSection = ({ title, data }: SidebarSectionProps) => {
    return (
        <>
            <span className="font-[500] text-gray-800">{title}</span>
            <ul className="w-full flex flex-col ">
                {data?.map(course => (
                    <li key={course.class_code} className="px-6 py-2 rounded-full hover:bg-gray-200 cursor-pointer transition duration-100 ease-in">
                        <MiniClassCard name={course.class_name} section={course.section} />
                    </li>
                ))}
            </ul>
        </>
    )
}
