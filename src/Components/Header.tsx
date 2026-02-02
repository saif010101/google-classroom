import { Bars3Icon, PlusIcon } from "@heroicons/react/16/solid"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { useDropdown } from "../hooks/useDropdown.tsx"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

interface HeaderProps {
    setSideBarOpen: (state: boolean) => void
    className?: string
    classSection?: string
}


export const Header = ({ setSideBarOpen, className = 'Database Systems', classSection = '4B Spring26' }: HeaderProps) => {

    const { anchorElem, handleClick, handleClose } = useDropdown()
    const open: boolean = anchorElem ? true : false


    return (
        <header className="flex items-center gap-3 justify-between p-4 bg-gray-100">
            <Bars3Icon onClick={() => setSideBarOpen(true)} className="size-6 text-gray-700 cursor-pointer" />
            <div className="flex flex-col mr-auto">
                <span>{className}</span>
                <span className="text-sm">{classSection}</span>
            </div>
            <Cog6ToothIcon className="size-6 text-gray-700" />
            <div>
                <button onClick={handleClick} className="cursor-pointer rounded-full hover:bg-gray-200">
                    <PlusIcon className="size-6 text-gray-700" />
                </button>
                <Menu open={open} onClose={handleClose} anchorEl={anchorElem}>
                    <MenuItem onClick={handleClose}>Join class</MenuItem>
                    <MenuItem onClick={handleClose}>Create class</MenuItem>
                </Menu>
            </div>
        </header>
    )
}