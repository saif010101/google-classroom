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
            <ul className="flex flex-col">
                {data?.map(course => (
                    <li className="px-6 py-2 rounded-full hover:bg-gray-200 cursor-pointer">
                        <MiniClassCard name={course.class_name} section={course.section} />
                    </li>
                ))}
            </ul>
        </>
    )
}
