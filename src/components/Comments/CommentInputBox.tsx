import { ArrowRightCircleIcon, UserIcon } from "@heroicons/react/16/solid"
import { TextField } from "@mui/material"
import { useState } from "react"

export const CommentInputBox = () => {
    
    const [comment, setComment] = useState('')

    const commentIconStyles = comment.length > 0 ? 'text-gray-800' : 'text-gray-400'

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value)
    }
    return (
        <div className="flex items-center gap-3">
            <UserIcon className="size-10" />
            <TextField
                sx={{
                    outline : '1px solid black',
                    borderRadius : '2rem',
                    overflow : 'hidden'
                }}
                id="outlined-multiline-flexible"
                multiline
                minRows={1}
                className="w-full "
                name="content"
                variant="outlined"
                placeholder="Add class comment..."
                onChange={handleInputChange}
            />
            <div className="p-1 rounded-full cursor-pointer hover:bg-gray-300">
                <ArrowRightCircleIcon className={`size-8 ${commentIconStyles}`} />
            </div>
        </div>
    )
}
