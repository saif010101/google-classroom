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
import { useClassContext } from '../../hooks/useClassContext';
import { ClassAPIService } from '../../api/ClassAPIService';
import { Snackbar } from '@mui/material';


export function EditClassDialog() {

    const queryClient = useQueryClient()
    const { setAlert } = useAlertContext()
    const { currentClass } = useClassContext()

    if (!currentClass) {
        return
    }

    const [classData, setClassData] = useState({
        name: currentClass.name,
        section: currentClass.section
    })

    const mutate = useMutation({
        mutationFn: () => ClassAPIService.editClass(currentClass.class_code, classData),
        onSuccess: () => {
            // this so to force a refetch of current class data so the user can see the updated data
            queryClient.invalidateQueries({ queryKey: ['class'], refetchType: 'all' })
            // this so to force a refetch of all class data so the user can see the updated class in sidebar as well
            queryClient.invalidateQueries({ queryKey: ['classData'], refetchType: 'all' })

            // i am using setTimeout so that the alert disappears after 2 seconds
            // since i cannot think of a way to set alert state besides this atm
            setAlert({ status: "success", message: "Class details updated successfully" })
            setTimeout(() => {
                setAlert({ status: "pending", message: "" })
            }, 2000)
        }
    })

    const { closeDialog } = useDialogContext()

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
            <Snackbar
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                message="Operation in progress"
                open={mutate.isPending}
            />
            <Dialog open={true} onClose={handleClose}>
                <DialogTitle>Edit Class</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <TextField
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
                            defaultValue={currentClass?.name}

                        />
                        <TextField
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
                            defaultValue={currentClass?.section}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}