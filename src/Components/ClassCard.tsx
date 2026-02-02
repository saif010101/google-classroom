import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import profilePic from "../assets/profile.png"
import { useDropdown } from "../hooks/useDropdown.tsx"

interface ClassCardProps {
    className: string
    teacherName: string
    profileUrl?: string
}

export const ClassCard = ({ className, teacherName, profileUrl }: ClassCardProps) => {

    const { anchorElem, handleClick, handleClose } = useDropdown()
    const open: boolean = anchorElem ? true : false

    return (
        <div className="w-80 grid grid-rows-[2fr 3fr 1fr] shadow-xl inset-shadow-md border border-gray-400 rounded-xl overflow-hidden">
            <div className="p-4 flex flex-col gap-2 bg-blue-500 text-white">
                <span className="text-2xl">{className}</span>
                <span className="text-sm">{teacherName}</span>
            </div>
            <div className="h-30 relative">
                {/* teacher image */}
                <div className="absolute right-5 -translate-y-[50%] rounded-full overflow-hidden">
                    <img className="size-15" src={profilePic} alt="" />
                </div>
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
