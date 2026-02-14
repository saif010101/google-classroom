import { UserCard } from "./UserCard.tsx"
import profileUrl from '../../assets/profile.png'
import { HomeIcon } from "@heroicons/react/24/outline"
import { MiniClassCard } from "./MiniClassCard.tsx"
import { useQuery } from "@tanstack/react-query"
import { getAllClasses } from "../../api/getAllClasses.ts"
import { type ClassData } from "../../types/ClassData.ts"
// import { type ClassData } from "../../types/ClassData.ts"
import type { RefObject } from "react"

interface SidebarProps {
    ref: RefObject<HTMLDivElement | null>;
    isOpen: boolean;
}

export const Sidebar = ({ ref, isOpen }: SidebarProps) => {

    const { data } = useQuery({
        queryKey: ['classData'],
        queryFn: getAllClasses
    })


    const closedStyle = !isOpen ? '-translate-x-[100%]' : ''

    return (
        <>
            {/* empty container for black overlay */}
            {isOpen && <div className="absolute top-0 w-full h-screen bg-black/50"></div>}
            <aside ref={ref} className={`z-1 absolute top-0 ${closedStyle} w-8/10 h-screen p-4 flex flex-col gap-7 items-start bg-white rounded-r-xl transition-all duration-300 ease-in`}>
                <UserCard name={"Muhammad Saif"} email={"p230512@pwr.nu.edu.pk"} profileUrl={profileUrl} />
                <ul className="w-9/10">
                    <li className="p-4 flex gap-5 rounded-full hover:cursor-pointer hover:bg-gray-200">
                        <HomeIcon className="size-6" />
                        <span>Home</span>
                    </li>
                </ul>
                <span className="font-[500] text-gray-800">Teaching</span>
                <ul className="flex flex-col">
                    {data?.data.filter((item: ClassData) => item.role === 'teacher').map((course: ClassData) => (
                        <li className="px-6 py-2 rounded-full hover:bg-gray-200 cursor-pointer">
                            <MiniClassCard name={course.class_name} section={course.section} />
                        </li>
                    ))}
                </ul>
                <span className="font-[500] text-gray-800">Enrolled</span>
                <ul>
                    {data?.data.filter((item: ClassData) => item.role === 'student').map((course: ClassData) => (
                        <li className="px-6 py-2 rounded-full hover:bg-gray-200 cursor-pointer">
                            <MiniClassCard name={course.class_name} section={course.section} />
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    )
}