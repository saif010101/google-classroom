import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDialogContext } from '../../hooks/useDialogContext';

export function JoinClassDialog() {


    const { activeDialog, closeDialog } = useDialogContext()


    const handleClose = () => {
        closeDialog()
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
                            name="email"
                            label="Class code"
                            type="text"
                            fullWidth
                            variant="standard"
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