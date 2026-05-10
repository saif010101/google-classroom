import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDialogContext } from '../../hooks/useDialogContext';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useAlertContext } from '../../hooks/useAlertContext';
import { Snackbar } from '@mui/material';
import { usePostContext } from '../../hooks/usePostContext';
import { PostsAPIService } from '../../api/PostsAPIService';



export function EditPostDialog() {

    const queryClient = useQueryClient()
    const { setAlert } = useAlertContext()
    const { currentPost } = usePostContext()
    const [postContent, setPostContent] = useState<string>(currentPost ? currentPost.content : "")

    if (!currentPost) {
        return
    }
    const mutate = useMutation({
        mutationFn: () => PostsAPIService.editPost(currentPost.post_id, postContent),
        onSuccess: () => {
            // this so to force a refetch of posts data so we user can see newly created post
            queryClient.invalidateQueries({ queryKey: ['post'], refetchType: 'all' })

            // i am using setTimeout so that the alert disappears after 2 seconds
            // since i cannot think of a way to set alert state besides this atm
            setAlert({
                status: "success",
                message: "Post updated successfully"
            })

            setTimeout(() => {
                setAlert({
                    status: "pending",
                    message: ""
                })
            }, 2000)
        }
    })

    const { activeDialog, closeDialog } = useDialogContext()

    const handleClose = () => {
        closeDialog()
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate.mutate()
        handleClose();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostContent(event.target.value)
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                message="Operation in progress"
                open={mutate.isPending}
            />
            <Dialog fullWidth={true} maxWidth={'sm'} open={activeDialog === "edit-post"} onClose={handleClose}>
                <DialogTitle>Post</DialogTitle>
                <DialogContent>
                    <form className="p-3" onSubmit={handleSubmit} id="subscription-form">
                        <TextField
                            id="outlined-multiline-static"
                            label="Announce something to your class"
                            multiline
                            minRows={4}
                            className="w-full"
                            name="content"
                            onChange={handleChange}
                            defaultValue={postContent}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}