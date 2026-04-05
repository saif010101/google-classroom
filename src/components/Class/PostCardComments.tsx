import { ChatBubbleBottomCenterTextIcon, ArrowRightCircleIcon, UserIcon } from "@heroicons/react/24/outline"
import { TextField } from "@mui/material"
import { useState } from "react"


export const PostCardComments = () => {
    const [inputActive, setInputActive] = useState(false)
    const [comment, setComment] = useState('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value)
    }

    const commentIconStyles = comment.length > 0 ? 'text-gray-900' : 'text-gray-300'
    return (
        <div className='p-5 border-t-1 border-gray-300'>
            {!inputActive ?
                <div onClick={() => setInputActive(true)} className='w-46 px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-blue-100 rounded-full'>
                    <ChatBubbleBottomCenterTextIcon className='size-6 text-blue-700' />
                    <span className='text-blue-700 font-[500]'>Add comment</span>
                </div> :
                <div className="flex items-center gap-3">
                    <UserIcon className="size-10" />
                    <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        minRows={1}
                        className="w-full"
                        name="content"
                        variant="outlined"
                        placeholder="Add class comment..."
                        onChange={handleInputChange}
                    />
                    <div className="p-1 rounded-full cursor-pointer hover:bg-gray-300">
                        <ArrowRightCircleIcon className={`size-8 ${commentIconStyles}`} />
                    </div>
                </div>
            }
        </div>
    )
}
