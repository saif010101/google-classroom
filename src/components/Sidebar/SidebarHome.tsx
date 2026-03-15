import { HomeIcon } from "@heroicons/react/24/outline"
import { NavLink } from "react-router"
import { useSidebarContext } from "../../hooks/useSidebarContext"


export const SidebarHome = () => {
    const { setSidebarOpen } = useSidebarContext()
    return (
        <ul className="w-full ">
            <NavLink onClick={() => setSidebarOpen(false)} to="/" className={({ isActive }) => `p-4 flex gap-5 rounded-full hover:cursor-pointer hover:bg-gray-200 transition duration-100 ease-in ${isActive && 'bg-gray-300'}`}>
                <HomeIcon className="size-6" />
                <span>Home</span>
            </NavLink>
        </ul>
    )
}
