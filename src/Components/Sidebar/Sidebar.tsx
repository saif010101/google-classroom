import { UserCard } from "./UserCard.tsx"
import profileUrl from '../../assets/profile.png'
import { HomeIcon } from "@heroicons/react/24/outline"
import type { RefObject } from "react"

interface SidebarProps {
    ref: RefObject<HTMLDivElement | null>;
    isOpen: boolean;
}

export const Sidebar = ({ ref, isOpen }: SidebarProps) => {

    const closedStyle = !isOpen ? '-translate-x-[100%]' : ''

    return (
        <>
            {/* empty container for black overlay */}
            {isOpen && <div className="absolute top-0 w-full h-screen bg-black/50"></div>}
            <aside ref={ref} className={`z-1 absolute top-0 ${closedStyle} w-8/10 h-screen p-4 flex flex-col gap-7 items-center bg-white rounded-r-xl transition-all duration-300 ease-in`}>
                <UserCard name={"Muhammad Saif"} email={"p230512@pwr.nu.edu.pk"} profileUrl={profileUrl} />
                <ul className="w-9/10">
                    <li className="p-4 flex gap-5 rounded-full hover:cursor-pointer hover:bg-gray-200">
                        <HomeIcon className="size-6" />
                        <span>Home</span>
                    </li>
                </ul>
            </aside>
        </>
    )
}