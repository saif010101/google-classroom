import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
import { UserIcon } from "@heroicons/react/24/outline"
import { Menu, MenuItem, Snackbar } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "../../api/deletePost"
import { useAlertContext } from "../../hooks/useAlertContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useDialogContext } from "../../hooks/useDialogContext"
import { useDropdown } from "../../hooks/useDropdown"
import { usePostContext } from "../../hooks/usePostContext"


interface PostCardHeaderProps {
    author: string
    date: string
    post_user_id: number
    post_id: number
    content: string
}

export const PostCardHeader = ({ post_id, author, date, post_user_id, content }: PostCardHeaderProps) => {

    const queryClient = useQueryClient()
    const { anchorElem, handleClick, handleClose } = useDropdown()
    const { user } = useAuthContext()
    const { setAlert } = useAlertContext()
    const mutate = useMutation({
        mutationFn: () => deletePost(post_id),
        onSuccess: () => {

            // this so to force a refetch of posts data so we user can see updated list of posts
            queryClient.invalidateQueries({ queryKey: ['post'], refetchType: 'all' })

            // i am using setTimeout so that the alert disappears after 2 seconds
            // since i cannot think of a way to set alert state besides this atm
            setAlert({
                status: "success",
                message: "Post deleted successfully"
            })

            setTimeout(() => {
                setAlert({
                    status: "pending",
                    message: ""
                })
            }, 2000)
        }
    })
    const { openEditPostDialog } = useDialogContext()
    const { setCurrentPost } = usePostContext()

    const open = Boolean(anchorElem)
    const hasDeletePermissions = user?.user_id === post_user_id

    const handleDeleteClick = () => {
        mutate.mutate()
    }

    const handleThreeDotsClick = () => {
        setCurrentPost({
            post_id, content
        })
    }

    const formattedDate = new Date(date).toLocaleDateString("en-UK", { day: "numeric", month: "long" })


    return (
        <>
            <Snackbar
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                message="Operation in progress"
                open={mutate.isPending}
            />
            <div className="p-5 flex justify-between items-center gap-4 shadow-xs">
                <UserIcon className="size-8" />
                <div className='flex flex-col mr-auto'>
                    <span className='text-gray-700 font-[600]'>{author}</span>
                    <span className='text-sm text-gray-500'>{formattedDate}</span>
                </div>
                {/* only show modification options if user is the author of the post */}
                {hasDeletePermissions &&
                    <div>
                        <button className='hover:cursor-pointer hover:bg-gray-200 rounded-full' onClick={handleClick}>
                            <EllipsisVerticalIcon onClick={handleThreeDotsClick} className="size-6" />
                        </button>
                        <Menu anchorEl={anchorElem} onClose={handleClose} open={open}>
                            <MenuItem onClick={() => {
                                openEditPostDialog()
                                handleClose()
                            }}>Edit</MenuItem>
                            <MenuItem onClick={() => {
                                handleDeleteClick()
                                handleClose()
                            }}>Delete</MenuItem>
                        </Menu>
                    </div>
                }
            </div>
        </>
    )
}
