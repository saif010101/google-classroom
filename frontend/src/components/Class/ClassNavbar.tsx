import { NavLink } from "react-router"

export const ClassNavbar = () => {

    const currentStyle = 'text-blue-700 border-b-4'

    return (
        <nav className="px-4 border-b-1 border-gray-300">
            <ul className="flex justify-center">
                <NavLink to="stream" className={({ isActive }) => `${isActive && currentStyle} p-3 text-center hover:cursor-pointer hover:bg-gray-200 grow-1`}>Stream</NavLink>
                <NavLink to="people" className={({ isActive }) => `${isActive && currentStyle} p-3 text-center hover:cursor-pointer hover:bg-gray-200 grow-1`}>People</NavLink>
            </ul>
        </nav>
    )
}
