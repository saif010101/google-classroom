import { EllipsisVerticalIcon, UserIcon } from "@heroicons/react/16/solid"
import { Menu, MenuItem, Snackbar } from "@mui/material"
import { useState } from "react"
import { useDropdown } from "../../hooks/useDropdown"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAlertContext } from "../../hooks/useAlertContext"
import { EditCommentBox } from "./EditCommentBox"
import { CommentsAPIService } from "../../api/CommentsAPIService"

interface CommentBoxProps {
    author: string
    date: string
    content: string
    author_id: number
    comment_id: number
}

export const CommentBox = ({ comment_id, author_id, author, date, content }: CommentBoxProps) => {

    const queryClient = useQueryClient()
    const { setAlert } = useAlertContext()
    const { user } = useAuthContext()
    const [iconVisible, setIconVisible] = useState(false)
    const [isEditState, setIsEditState] = useState(false)
    const { anchorElem, handleClick, handleClose, open } = useDropdown()
    const mutate = useMutation({
        mutationFn: () => CommentsAPIService.deleteComment(comment_id),
        onSuccess: () => {
            // this so to force a refetch of posts data so we user can see updated list of posts
            queryClient.invalidateQueries({ queryKey: ['comments'], refetchType: 'all' })

            // i am using setTimeout so that the alert disappears after 2 seconds
            // since i cannot think of a way to set alert state besides this atm
            setAlert({
                status: "success",
                message: "Comment deleted successfully"
            })

            setTimeout(() => {
                setAlert({
                    status: "pending",
                    message: ""
                })
            }, 2000)
        }
    })

    const formattedDate = new Date(date).toLocaleDateString("en-UK", { day: "numeric", month: "long" })
    const isAuthor = user?.user_id === author_id // check if the user viewing the comment is the author

    const handleDeleteClick = () => {
        mutate.mutate()
        handleClose()
    }

    const handleEditClick = () => {
        setIsEditState(true)
        handleClose()
    }


    return (
        <>
            <Snackbar
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                message="Operation in progress"
                open={mutate.isPending}
            />
            <div onMouseEnter={() => setIconVisible(true)} onMouseLeave={() => setIconVisible(false)} className="py-5 flex justify-between items-center gap-4 shadow-xs">
                <UserIcon className="size-8" />
                <div className='flex flex-col gap-1 mr-auto'>
                    <span className='text-xs text-gray-700 font-[600]'>{author} • {formattedDate} </span>
                    {!isEditState ? <span className='text-sm text-gray-900'>{content}</span> : <EditCommentBox comment_id={comment_id} oldComment={content} setIsEditState={setIsEditState}/>}
                </div>
                {/* only render edit options if the author of the comment is viewing it */}
                {isAuthor && !isEditState && <>
                    <button onClick={handleClick} id="basic-button" className={`cursor-pointer ${!iconVisible && 'opacity-0'}`} >
                        <EllipsisVerticalIcon className="size-5 text-gray-700" />
                    </button>
                    <Menu open={open} onClose={handleClose} anchorEl={anchorElem}>
                        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                    </Menu>
                </>
                }
            </div>
        </>
    )
}
