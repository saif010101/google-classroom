import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDialogContext } from '../hooks/useDialogContext';

export function CreateClassDialog() {

    // the order matters here, refer to App.tsx to know which index belongs to which dialog
    const [joinDialog, createDialog] = useDialogContext()

    const handleClose = () => {
        createDialog.setIsDialogOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const formData = new FormData(event.currentTarget);
        // const formJson = Object.fromEntries((formData as any).entries());
        // const email = formJson.email;
        // console.log(email);
        handleClose();
    };

    return (
        <>
            <Dialog open={createDialog.isDialogOpen} onClose={handleClose}>
                <DialogTitle>Create Class</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Class name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Section"
                            type="text"
                            fullWidth
                            variant="standard"
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