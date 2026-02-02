export const ClassNavbar = () => {

    const currentStyle = 'text-blue-700 border-b-4'
    
    return (
        <nav className="px-4 border-b-1 border-gray-300">
            <ul className="flex justify-between">
                <li className="p-3 hover:cursor-pointer hover:bg-gray-200">Stream</li>
                <li className="p-3 hover:cursor-pointer hover:bg-gray-200">Classwork</li>
                <li className="p-3 hover:cursor-pointer hover:bg-gray-200">People</li>
                <li className="p-3 hover:cursor-pointer hover:bg-gray-200">Grades</li>
            </ul>
        </nav>
    )
}
