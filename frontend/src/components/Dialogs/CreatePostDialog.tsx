import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDialogContext } from '../../hooks/useDialogContext';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useAlertContext } from '../../hooks/useAlertContext';
import { Snackbar } from '@mui/material';
import { useClassContext } from '../../hooks/useClassContext';
import { PostsAPIService } from '../../api/PostsAPIService';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { MaterialAPIService } from '../../api/MaterialAPIService';



export function CreatePostDialog() {

    const controllerRef = useRef<AbortController | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const queryClient = useQueryClient()
    const { setAlert } = useAlertContext()
    const { currentClass } = useClassContext()
    const [postContent, setPostContent] = useState<string>("")
    const [material, setMaterial] = useState({
        file_name: '',
        content_type: ''
    })
    const [progress, setProgress] = useState(0)

    const mutate = useMutation({
        mutationFn: () => PostsAPIService.createPost(currentClass?.class_code, postContent),
        onSuccess: () => {
            // this so to force a refetch of posts data so we user can see newly created post
            queryClient.invalidateQueries({ queryKey: ['post'], refetchType: 'all' })

            // i am using setTimeout so that the alert disappears after 2 seconds
            // since i cannot think of a way to set alert state besides this atm
            setAlert({
                status: "success",
                message: "Post created successfully"
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

    const getUploadUrl = async () => {
        const url = await queryClient.fetchQuery({
            queryKey: ['upload_url'],
            queryFn: () => MaterialAPIService.getUploadUrl(currentClass?.name as string, material.file_name, material.content_type)
        })

        return url
    }

    const handleClose = () => {
        // cancel upload
        if (controllerRef.current)
            controllerRef.current.abort()

        // clear state upon closing
        setMaterial({
            file_name: '',
            content_type: ''
        })
        setProgress(0)
        closeDialog()
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        controllerRef.current = new AbortController()

        try {
            const url = await getUploadUrl()
            const { status } = await MaterialAPIService.uploadData(url, formData.get('file') as File, (number) => setProgress(number), controllerRef.current.signal)

            // if status === 200, write file metadata to database

        } catch (err) {
            console.error(err)
        }
        // handle upload here
        // use fetchQuery() for put request
        mutate.mutate()
        handleClose();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostContent(event.target.value)
    }


    const handleFileChange = () => {
        const files = inputRef && inputRef.current ? inputRef.current.files : null
        setMaterial({
            file_name: (files ? files[0].name : ''),
            content_type: (files ? files[0].type : '')
        })
        setProgress(0)
    }


    return (
        <>
            <Snackbar
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                message="Operation in progress"
                open={mutate.isPending}
            />
            <Dialog fullWidth={true} maxWidth={'sm'} open={activeDialog === "create-post"} onClose={handleClose}>
                <DialogTitle>Post</DialogTitle>
                <DialogContent>
                    <form className="flex flex-col gap-3 p-3" onSubmit={handleSubmit} id="subscription-form">
                        <TextField
                            id="outlined-multiline-static"
                            label="Announce something to your class"
                            multiline
                            minRows={4}
                            className="w-full"
                            name="content"
                            onChange={handleChange}
                        />
                        <label className="flex items-center gap-2" htmlFor="fileInput">
                            <ArrowUpTrayIcon className='p-1 size-8 border rounded-full hover:bg-gray-200 cursor-pointer' />
                        </label>
                        <input onChange={handleFileChange} ref={inputRef} name="file" id="fileInput" className="hidden" type="file" />

                        {material.file_name && 
                            <div className='p-2 flex items-center gap-3 border border-gray-400 bg-gray-200 text-gray-700 self-start rounded-lg font-medium'>
                                <span>{material.file_name}</span>
                                <span>{Math.round(progress * 100)}%</span>
                            </div>
                        }
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