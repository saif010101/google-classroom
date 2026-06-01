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
import { Divider, Snackbar } from '@mui/material';
import { useClassContext } from '../../hooks/useClassContext';
import { PostsAPIService } from '../../api/PostsAPIService';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { MaterialAPIService } from '../../api/MaterialAPIService';
import axios from 'axios';
import { CircularProgressWithLabel } from '../CircularProgressWithLabel';



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
    const [postBtnDisabled,setPostBtnDisabled] = useState(false)

    const mutate = useMutation({
        mutationFn: () => PostsAPIService.createPost(currentClass?.class_code, postContent),
        onSuccess: async (response) => {

            const { post_id } = response
            await MaterialAPIService.createMaterial(material.file_name, material.content_type, currentClass?.name as string, post_id)

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
            handleClose();
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
        setPostBtnDisabled(true)

        if (material.file_name) {

            const formData = new FormData(event.currentTarget)
            controllerRef.current = new AbortController()

            try {
                const url = await getUploadUrl()
                await MaterialAPIService.uploadData(url, formData.get('file') as File, (number) => setProgress(number), controllerRef.current.signal)

            } catch (err) {
                // if request was canceled
                if (axios.isCancel(err)) {
                    setAlert({
                        status: "failed",
                        message: "Upload cancelled!"
                    })

                    setTimeout(() => {
                        setAlert({
                            status: "pending",
                            message: ""
                        })
                    }, 2000)
                    handleClose();
                }
            }
        }

        mutate.mutate()
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
                    <form className="flex flex-col items-start gap-3 p-3" onSubmit={handleSubmit} id="subscription-form">
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
                            <div className='w-full p-2 flex justify-between items-center gap-3 border border-gray-400 bg-gray-200 text-gray-700 self-start rounded-lg font-medium'>
                                <p className='break-all'>{material.file_name} - 23.7 MB</p>
                                <Divider orientation="vertical" flexItem />
                                <CircularProgressWithLabel progress={progress} />
                            </div>
                        }
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={postBtnDisabled} type="submit" form="subscription-form">
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}