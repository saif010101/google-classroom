import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDialogContext } from '../../hooks/useDialogContext';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createClass } from '../../api/createClass';
import { useQueryClient } from '@tanstack/react-query';
import { useAlertContext } from '../../hooks/useAlertContext';
import { Alert, CircularProgress, DialogContentText, Snackbar } from '@mui/material';
import { useClassContext } from '../../hooks/useClassContext';
import { createPost } from '../../api/createPost';


export function CreatePostDialog() {

    const queryClient = useQueryClient()
    const { currentClass } = useClassContext()
    const [alertVisible, setAlertVisible] = useState(false)
    const [postContent, setPostContent] = useState<string>("")

    const mutate = useMutation({
        mutationFn: () => createPost(currentClass?.class_code, postContent),
        onSuccess: () => {
            // this so to force a refetch of posts data so we user can see newly created post
            queryClient.invalidateQueries({ queryKey: ['post'], refetchType: 'all' })
    
            // show success alert
            setAlertVisible(true)
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

    const onClose = () => {
        setAlertVisible(false)
    }

    return (
        <>
            <Snackbar open={mutate.isPending} message="Operation in progress" />
            <Snackbar onClose={onClose} open={alertVisible} message="Operation in progress" autoHideDuration={2000}>
                <Alert className="w-full" variant="filled" severity="success">
                    Post created successfully.
                </Alert>
            </Snackbar>
            <Dialog fullWidth={true} maxWidth={'sm'} open={activeDialog === "create-post"} onClose={handleClose}>
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
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}