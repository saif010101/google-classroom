import { UserCard } from "./UserCard.tsx"
import { useClassData } from "../../hooks/useClassData.tsx"
import { useContext, type RefObject } from "react"
import { SidebarSection } from "./SidebarSection.tsx"
import { SidebarOverlay } from "./SidebarOverlay.tsx"
import { SidebarHome } from "./SidebarHome.tsx"
import { AuthContext } from "../../contexts/AuthContext.tsx"
import { useSidebarContext } from "../../hooks/useSidebarContext.tsx"

interface SidebarProps {
    ref: RefObject<HTMLDivElement | null>;
}

export const Sidebar = ({ ref }: SidebarProps) => {

    const authContext = useContext(AuthContext)

    if (!authContext) {
        return null
    }

    const { user } = authContext
    const { data } = useClassData()
    const { sidebarOpen } = useSidebarContext()

    const enrolledClasses = data?.filter(item => item.role === 'student')
    const teachingClasses = data?.filter(item => item.role === 'teacher')
    const closedStyle = !sidebarOpen ? '-translate-x-[100%]' : ''

    return (
        <>
            {/* empty container for black overlay */}
            {sidebarOpen && <SidebarOverlay />}
            <aside ref={ref} className={`z-1 absolute top-0 ${closedStyle} w-8/10 max-w-[20rem] h-screen p-4 flex flex-col gap-7 items-start bg-white rounded-r-xl transition-all duration-300 ease-in overflow-y-scroll`}>
                {user && <UserCard name={user.full_name} email={user.email} />}
                <SidebarHome />
                <SidebarSection title="Teaching" data={teachingClasses} />
                <SidebarSection title="Enrolled" data={enrolledClasses} />
            </aside>
        </>
    )
}