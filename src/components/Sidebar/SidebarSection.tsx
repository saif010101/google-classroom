import { MiniClassCard } from "./MiniClassCard.tsx"
import { type ClassData } from "../../types/ClassData.ts"
import { NavLink } from "react-router"


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
                    <NavLink to={`/c/${course.class_code}/stream`} key={course.class_code} className={({isActive}) => `px-6 py-2 rounded-full hover:bg-gray-200 cursor-pointer transition duration-100 ease-in ${isActive && 'bg-gray-300'}`}>
                        <MiniClassCard name={course.class_name} section={course.section} />
                    </NavLink>
                ))}
            </ul>
        </>
    )
}
