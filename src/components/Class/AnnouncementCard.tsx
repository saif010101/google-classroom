import profile from '../../assets/profile.png'
import { EllipsisVerticalIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/16/solid'
import { useDropdown } from '../../hooks/useDropdown'
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

interface AnnouncementCardProps {
    author: string
    date: string
    content: string
}

export const AnnouncementCard = ({ author = 't', date = '2',content = 'Hello, world' }: AnnouncementCardProps) => {

    const { anchorElem, handleClick, handleClose } = useDropdown()
    const open = Boolean(anchorElem)

    return (
        <div className='bg-gray-100 rounded-xl'>
            <div className="p-5 flex justify-between items-center gap-4">
                <img className='rounded-full size-10' src={profile} alt="" />
                <div className='flex flex-col mr-auto'>
                    <span className='text-gray-700 font-[500]'>{author}</span>
                    <span className='text-sm text-gray-500'>{date.toString()}</span>
                </div>
                <div>
                    <button className='hover:cursor-pointer hover:bg-gray-200 rounded-full' onClick={handleClick}>
                        <EllipsisVerticalIcon className="size-6" />
                    </button>
                    <Menu anchorEl={anchorElem} onClose={handleClose} open={open}>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </Menu>
                </div>
            </div>
            <p className='px-5 py-2 whitespace-pre-line whitespace-break-spaces'>
                {content}
            </p>
            <div className='p-5 border-t-1 border-gray-300'>
                <div className='w-46 px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-blue-100 rounded-full'>
                    <ChatBubbleBottomCenterTextIcon className='size-6 text-blue-700' />
                    <span className='text-blue-700 font-[500]'>Add comment</span>
                </div>
            </div>
        </div>
    )
}
