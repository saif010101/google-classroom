import { ArrowRightCircleIcon, UserIcon } from "@heroicons/react/16/solid"
import { TextField } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { createComment } from "../../api/createComment"
import { DotLoader, FadeLoader, MoonLoader } from "react-spinners"


interface CommentInputBoxProps {
    post_id: number
}

export const CommentInputBox = ({ post_id }: CommentInputBoxProps) => {

    const [comment, setComment] = useState('')
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: () => createComment(post_id, comment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'], refetchType: 'all' })
        }
    })
    const commentIconStyles = comment.length > 0 ? 'text-gray-800' : 'text-gray-400'

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value)
    }

    const handleSubmitClick = () => {
        mutate.mutate()
    }

    return (
        <div className="flex items-center gap-3">
            <UserIcon className="size-10" />
            <TextField
                id="outlined-multiline-flexible"
                multiline
                minRows={1}
                className="w-full "
                name="content"
                variant="outlined"
                placeholder="Add class comment..."
                onChange={handleInputChange}
            />
            <div onClick={handleSubmitClick} className="p-1 rounded-full cursor-pointer hover:bg-gray-300">
                {!mutate.isPending && <ArrowRightCircleIcon className={`size-8 ${commentIconStyles}`} />}
                <DotLoader size={20} loading={mutate.isPending} color="#3b97b8" />
            </div>
        </div>
    )
}
