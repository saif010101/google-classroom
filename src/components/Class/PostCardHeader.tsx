import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
import { useDropdown } from "../../hooks/useDropdown"
import { Alert, Menu, MenuItem, Snackbar } from "@mui/material"
import { UserIcon } from "@heroicons/react/24/outline"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "../../api/deletePost"
import { useState } from "react"


interface PostCardHeaderProps {
    author: string
    date: string
    post_user_id: number
    post_id: number
}

export const PostCardHeader = ({ post_id, author, date, post_user_id }: PostCardHeaderProps) => {

    const queryClient = useQueryClient()
    const { anchorElem, handleClick, handleClose } = useDropdown()
    const { user } = useAuthContext()
    const [alertVisible, setAlertVisible] = useState(false)
    const mutate = useMutation({
        mutationFn: () => deletePost(post_id),
        onSuccess: () => {
            // this so to force a refetch of posts data so we user can see updated list of posts
            // queryClient.invalidateQueries({ queryKey: ['post'], refetchType: 'all' })
            
            // show success alert
            setAlertVisible(true)
        }
    })
    
    const open = Boolean(anchorElem)
    const hasDeletePermissions = user?.user_id === post_user_id

    const handleDeleteClick = () => {
        mutate.mutate()
    }

    const onClose = () => {
        setAlertVisible(false)
    }

    console.log(alertVisible)
    return (
        <>
            <Snackbar open={mutate.isPending} message="Operation in progress" />
            <Snackbar onClose={onClose} open={alertVisible} message="Operation in progress" autoHideDuration={2000}>
                <Alert className="w-full" variant="filled" severity="success">
                    Post deleted successfully.
                </Alert>
            </Snackbar>
            <div className="p-5 flex justify-between items-center gap-4">
                <UserIcon className="size-8" />
                <div className='flex flex-col mr-auto'>
                    <span className='text-gray-700 font-[500]'>{author}</span>
                    <span className='text-sm text-gray-500'>{new Date(date).toLocaleString()}</span>
                </div>
                {/* only show modification options if user is the author of the post */}
                {hasDeletePermissions &&
                    <div>
                        <button className='hover:cursor-pointer hover:bg-gray-200 rounded-full' onClick={handleClick}>
                            <EllipsisVerticalIcon className="size-6" />
                        </button>
                        <Menu anchorEl={anchorElem} onClose={handleClose} open={open}>
                            <MenuItem>Edit</MenuItem>
                            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                        </Menu>
                    </div>
                }
            </div>
        </>
    )
}
