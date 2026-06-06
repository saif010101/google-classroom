import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useQuery, } from '@tanstack/react-query';
import { PostsAPIService } from '../../api/PostsAPIService';
import { usePostContext } from '../../hooks/usePostContext';
import { useDialogContext } from '../../hooks/useDialogContext';
import { Typography } from '@mui/material';
import { MoonLoader } from 'react-spinners';

export function AISummaryDialog() {

    const { currentPost } = usePostContext()
    const { activeDialog, closeDialog } = useDialogContext()

    if (!currentPost){
        return
    }

    const { data, isPending,isSuccess } = useQuery({
        queryKey: ['ai-summary'],
        queryFn: () => PostsAPIService.getPostSummary(currentPost.content),
        refetchOnWindowFocus : false,
        gcTime : 0
    })



    const handleClose = () => {
        closeDialog()
    };


    return (
        <>
            <Dialog open={activeDialog === "ai-summary"} onClose={handleClose}>
                <DialogTitle>AI Urdu Summary</DialogTitle>
                <DialogContent className='flex justify-center items-center'>
                    <Typography gutterBottom>
                        {isPending && <MoonLoader size={30} />}
                        {!isPending && isSuccess && data.summary}
                        {!isPending && !isSuccess && 'Something went wrong, we apologise for the inconvenience.'}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}