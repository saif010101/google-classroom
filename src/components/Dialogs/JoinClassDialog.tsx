import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDialogContext } from '../../hooks/useDialogContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAlertContext } from '../../hooks/useAlertContext';
import { joinClass } from '../../api/joinClass';

export function JoinClassDialog() {

    const queryClient = useQueryClient()
    const { setAlert } = useAlertContext()
    const { activeDialog, closeDialog } = useDialogContext()

    const [classData, setClassData] = useState({
        class_code: ''
    })

    const mutate = useMutation({
        mutationFn: () => joinClass(classData),
        onSuccess: () => {
            // this so to force a refetch of class data so we user can see newly created class
            queryClient.invalidateQueries({ queryKey: ['classData'], refetchType: 'all' })
            // i am using setTimeout so that the alert disappears after 2 seconds
            // since i cannot think of a way to set alert state besides this atm
            setAlert({
                status: "success",
                message: "Class joined successfully"
            })
            setTimeout(() => {
                setAlert({
                    status: "pending",
                    message: ""
                })
            }, 2000)
        }
    })

    const handleClose = () => {
        closeDialog()
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate.mutate()
        handleClose();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassData({ ...classData, [event.target.name]: event.target.value })
    }

    return (
        <>
            <Dialog open={activeDialog === "join"} onClose={handleClose}>
                <DialogTitle>Join Class</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ask your teacher for the class code, then enter it here
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="class_code"
                            label="Class code"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}