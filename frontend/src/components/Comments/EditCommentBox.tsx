import { Button, Snackbar, TextField } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useAlertContext } from "../../hooks/useAlertContext"
import { CommentsAPIService } from "../../api/CommentsAPIService"

interface EditCommentBoxProps {
    oldComment: string
    setIsEditState: React.Dispatch<React.SetStateAction<boolean>>
    comment_id: number
}

export const EditCommentBox = ({ setIsEditState, oldComment, comment_id }: EditCommentBoxProps) => {


    const queryClient = useQueryClient()
    const { setAlert } = useAlertContext()
    const [comment, setComment] = useState(oldComment)
    const mutate = useMutation({
        mutationFn: () => CommentsAPIService.editComment({ comment_id, content: comment }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'], refetchType: 'all' })
            // i am using setTimeout so that the alert disappears after 2 seconds
            // since i cannot think of a way to set alert state besides this atm
            setAlert({
                status: "success",
                message: "Comment updated successfully"
            })

            setTimeout(() => {
                setAlert({
                    status: "pending",
                    message: ""
                })
            }, 2000)
        }
    })

    const handleSubmitClick = () => {
        mutate.mutate()
    }

    const handleCancelClick = () => {
        setIsEditState(false)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value)
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                message="Operation in progress"
                open={mutate.isPending}
            />
            <div className="flex flex-col items-center gap-5">
                <TextField
                    id="outlined-multiline-flexible"
                    multiline
                    minRows={1}
                    className="w-full "
                    name="content"
                    variant="outlined"
                    placeholder="Add class comment..."
                    defaultValue={comment}
                    onChange={handleInputChange}
                />
                <div className="w-full flex gap-3 ">
                    <Button onClick={handleCancelClick} variant="text">Cancel</Button>
                    <Button onClick={handleSubmitClick} variant="contained">Save</Button>
                </div>
            </div>
        </>
    )
}
