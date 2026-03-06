import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useDropdown } from "../hooks/useDropdown.tsx"

interface ClassCardProps {
    courseName: string
    teacherName: string
    section : string
}

export const ClassCard = ({ courseName, teacherName,section }: ClassCardProps) => {

    const { anchorElem, handleClick, handleClose, open } = useDropdown()

    return (
        <div className="w-[370px] grid grid-rows-[2fr 3fr 1fr] border border-gray-400 rounded-xl overflow-hidden hover:shadow-xl hover:cursor-pointer">
            <div className="p-4 flex flex-col gap-2 bg-blue-500 text-white">
                <span className="text-2xl hover:underline">{courseName}</span>
                <span className="text-sm hover:underline">{section}</span>
                <span className="text-sm">{teacherName}</span>
            </div>
            <div className="h-30 relative">

            </div>
            <div className="p-3 flex justify-end border-t-1 border-gray-400">
                <button id="basic-button" className="cursor-pointer" onClick={handleClick} >
                    <EllipsisVerticalIcon className="size-6" />
                </button>
                <Menu open={open} onClose={handleClose} anchorEl={anchorElem}>
                    <MenuItem onClick={handleClose}>Unenroll</MenuItem>
                </Menu>
            </div>
        </div>
    )
}
