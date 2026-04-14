import { EllipsisVerticalIcon, UserIcon } from "@heroicons/react/16/solid"
import { Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { useDropdown } from "../../hooks/useDropdown"
import { useAuthContext } from "../../hooks/useAuthContext"

interface CommentBoxProps {
    author: string
    date: string
    content: string
    author_id: number
}

export const CommentBox = ({ author_id, author, date, content }: CommentBoxProps) => {

    const { anchorElem, handleClick, handleClose, open } = useDropdown()
    const [iconVisible, setIconVisible] = useState(false)
    const { user } = useAuthContext()

    const isAuthor = user?.user_id === author_id // check if the user viewing the comment is the author

    const formattedDate = new Date(date).toLocaleDateString("en-UK", { day: "numeric", month: "long" })

    return (
        <div onMouseEnter={() => setIconVisible(true)} onMouseLeave={() => setIconVisible(false)} className="py-5 flex justify-between items-center gap-4 shadow-xs">
            <UserIcon className="size-8" />
            <div className='flex flex-col gap-1 mr-auto'>
                <span className='text-xs text-gray-700 font-[600]'>{author} • {formattedDate} </span>
                <span className='text-sm text-gray-900'>{content}</span>
            </div>
            {/* only render edit options if the author of the comment is viewing it */}
            {isAuthor && <> 
                <button onClick={handleClick} id="basic-button" className={`cursor-pointer ${!iconVisible && 'opacity-0'}`} >
                    <EllipsisVerticalIcon className="size-5 text-gray-700" />
                </button>
                <Menu open={open} onClose={handleClose} anchorEl={anchorElem}>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </>
            }
        </div>
    )
}
