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


export function CreateClassDialog() {

    const [classData, setClassData] = useState({
        name: '',
        section: ''
    })

    const mutate = useMutation({
        mutationFn: () => createClass(classData)
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
    
    return (
        <>
            <Dialog open={activeDialog === "create"} onClose={handleClose}>
                <DialogTitle>Create Class</DialogTitle>
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
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}