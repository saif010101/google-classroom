import { MiniClassCard } from "./MiniClassCard.tsx"
import { type ClassData } from "../../types/ClassData.ts"
import { NavLink } from "react-router"
import { useSidebarContext } from "../../hooks/useSidebarContext.tsx"
import { useClassContext } from "../../hooks/useClassContext.tsx"


interface SidebarSectionProps {
    title: string
    data: ClassData[] | undefined
}

export const SidebarSection = ({ title, data }: SidebarSectionProps) => {
    const { setSidebarOpen } = useSidebarContext()
    const { setCurrentClass } = useClassContext()

    const handleClick = () => {
        setCurrentClass(undefined) 
        setSidebarOpen(false)
        // this is to make sure that previous state data 
        // does not cause any rendering issue
        // for example : if we don't do this,
        // <ClassNavbar/> is rendered before the data is fetched, 
        // because of previous class data in state
    }
    return (
        <>
            <span className="font-[500] text-gray-800">{title}</span>
            <ul className="w-full flex flex-col">
                {data?.length === 0 && title === 'Teaching' && <li className="text-sm">You are not currently teaching any class.</li>}
                {data?.length === 0 && title === 'Enrolled' && <li className="text-sm">You are not currently enrolled in any class.</li>}
                {data?.map(course => (
                    <NavLink onClick={handleClick} to={`/c/${course.class_code}/stream`} key={course.class_code} className={({ isActive }) => `px-1 py-2 rounded-full hover:bg-gray-200 cursor-pointer transition duration-100 ease-in ${isActive && 'bg-gray-300'}`}>
                        <MiniClassCard name={course.class_name} section={course.section} />
                    </NavLink>
                ))}
            </ul>
        </>
    )
}
