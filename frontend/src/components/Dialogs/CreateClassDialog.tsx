import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDialogContext } from '../../hooks/useDialogContext';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ClassAPIService } from '../../api/ClassAPIService';
import { useQueryClient } from '@tanstack/react-query';
import { useAlertContext } from '../../hooks/useAlertContext';



export function CreateClassDialog() {

    const queryClient = useQueryClient()
    const { setAlert } = useAlertContext()

    const [classData, setClassData] = useState({
        name: '',
        section: ''
    })

    const mutate = useMutation({
        mutationFn: () => ClassAPIService.createClass(classData),
        onSuccess: () => {
            // this so to force a refetch of class data so we user can see newly created class
            queryClient.invalidateQueries({ queryKey: ['classData'], refetchType: 'all' })
            // i am using setTimeout so that the alert disappears after 2 seconds
            // since i cannot think of a way to set alert state besides this atm
            setAlert({
                status: "success",
                message: "Class created successfully"
            })
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
        setClassData({ ...classData, [event.target.name]: event.target.value })
    }

    const isInputValid = () => {
        if (classData.name.length === 0 || classData.section.length === 0) {
            return false
        }

        if (classData.name.length > 50 || classData.section.length > 25) {
            return false
        }

        return true
    }

    return (
        <>
            <Dialog open={activeDialog === "create-class"} onClose={handleClose}>
                <DialogTitle>Create Class</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <TextField
                            error={classData.name.length > 50}
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Class name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            helperText="Max length allowed : 50"
                        />
                        <TextField
                            error={classData.section.length > 25}
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="section"
                            label="Section"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            helperText="Max length allowed : 25"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={!isInputValid()} type="submit" form="subscription-form">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}