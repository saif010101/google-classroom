import { HomeIcon } from "@heroicons/react/24/outline"

export const SidebarHome = () => {
    return (
        <ul className="w-full ">
            <li className="p-4 flex gap-5 rounded-full hover:cursor-pointer hover:bg-gray-200 transition duration-100 ease-in">
                <HomeIcon className="size-6" />
                <span>Home</span>
            </li>
        </ul>
    )
}
