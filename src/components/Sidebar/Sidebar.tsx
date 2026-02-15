import { UserCard } from "./UserCard.tsx"
import { useClassData } from "../../hooks/useClassData.tsx"
import type { RefObject } from "react"
import { SidebarSection } from "./SidebarSection.tsx"
import { SidebarOverlay } from "./SidebarOverlay.tsx"
import { SidebarHome } from "./SidebarHome.tsx"

interface SidebarProps {
    ref: RefObject<HTMLDivElement | null>;
    isOpen: boolean;
}

export const Sidebar = ({ ref, isOpen }: SidebarProps) => {

    const { data } = useClassData()

    const enrolledClasses = data?.filter(item => item.role === 'student')
    const teachingClasses = data?.filter(item => item.role === 'teacher')


    const closedStyle = !isOpen ? '-translate-x-[100%]' : ''

    return (
        <>
            {/* empty container for black overlay */}
            {isOpen && <SidebarOverlay />}
            <aside ref={ref} className={`z-1 absolute top-0 ${closedStyle} w-8/10 h-screen p-4 flex flex-col gap-7 items-start bg-white rounded-r-xl transition-all duration-300 ease-in`}>
                <UserCard name={"Muhammad Saif"} email={"p230512@pwr.nu.edu.pk"} />
                <SidebarHome />
                <SidebarSection title="Teaching" data={teachingClasses} />
                <SidebarSection title="Enrolled" data={enrolledClasses} />
            </aside>
        </>
    )
}