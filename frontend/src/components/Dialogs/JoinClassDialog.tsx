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
import { ClassAPIService } from '../../api/ClassAPIService';
import type { AxiosError } from 'axios';

export function JoinClassDialog() {

    const queryClient = useQueryClient()
    const { setAlert } = useAlertContext()
    const { activeDialog, closeDialog } = useDialogContext()

    const [classData, setClassData] = useState({
        class_code: ''
    })

    const mutate = useMutation({
        mutationFn: () => ClassAPIService.joinClass(classData),
        onSuccess: () => {
            // this so to force a refetch of class data so we user can see newly created class
            queryClient.invalidateQueries({ queryKey: ['classData'], refetchType: 'all' })
            setAlert({
                status: "success",
                message: "Class joined successfully"
            })
        },
        onError: (error) => {
            if ((error as AxiosError).status === 404) {
                setAlert({
                    status: "error",
                    message: "Class not found."
                })
            }
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

    const isInputValid = () => {
        if (classData.class_code.length > 0 && classData.class_code.length > 6) {
            return false
        }

        return true
    }
    return (
        <>
            <Dialog open={activeDialog === "join-class"} onClose={handleClose}>
                <DialogTitle>Join Class</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ask your teacher for the 6 letter classroom code, then enter it here
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <TextField
                            error={!isInputValid()}
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
                            helperText={!isInputValid() && "Class code must be of 6 characters"}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={classData.class_code.length !== 6} type="submit" form="subscription-form">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}