import axios from 'axios';
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
import { useClassContext } from '../../hooks/useClassContext';
import { PostsAPIService } from '../../api/PostsAPIService';
import { MaterialAPIService } from '../../api/MaterialAPIService';



export function CreatePostDialog() {

    const controllerRef = useRef<Map<string, AbortController>>(new Map())
    // const inputRef = useRef<HTMLInputElement | null>(null)
    const queryClient = useQueryClient()
    const { setAlert } = useAlertContext()
    const { currentClass } = useClassContext()
    const [postContent, setPostContent] = useState<string>("")
    const [material, setMaterial] = useState<File[] | null>(null)
    const [progress, setProgress] = useState<Map<string, number> | null>(null)
    const [postBtnDisabled, setPostBtnDisabled] = useState(false)

    if (!currentClass) {
        return
    }

    const mutate = useMutation({
        mutationFn: () => PostsAPIService.createPost(currentClass.class_code, postContent),
    })


    const { activeDialog, closeDialog } = useDialogContext()


    const getUploadUrl = async (file: File) => {
        return await MaterialAPIService.getUploadUrl(currentClass?.name as string, file.name, file.type)
    }

    const handleClose = () => {

        // clear state upon closing
        setMaterial(null)
        setPostBtnDisabled(false)
        setProgress(null)
        closeDialog()
    };


    const uploadFileToDB = async (file: File, post_id: number) => {
        await MaterialAPIService.createMaterial(file.name, file.type, currentClass.name, post_id)
    }

    // function : upload file to S3 
    const uploadFile = async (file: File) => {

        // keep filling AbortController map for each file
        const controller = new AbortController()
        controllerRef.current.set(file.name, controller)

        try {
            const url = await getUploadUrl(file)
            await MaterialAPIService.uploadData(url as string, file, (value: number) => setProgress(new Map(progress?.set(file.name, value))), controller.signal)

        } catch (err) {

            // if request was canceled
            if (axios.isCancel(err)) {
                setAlert({
                    status: "error",
                    message: `${file.name.substring(0, 15)}... upload was cancelled`
                })

                throw new Error("The upload was cancelled")
            }

        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        setPostBtnDisabled(true)
        // create post in database and get post_id
        const { post_id } = await mutate.mutateAsync()
        let uploaded = true
        if (material) {
            const result = await Promise.allSettled(
                material.map(file => {
                    return uploadFile(file).then(() => uploadFileToDB(file, post_id))
                })
            )

            // if promises are rejected [we can optimize this by using .some() and !]
            if (result.every(item => item.status === "rejected")) {
                await PostsAPIService.deletePost(post_id)
                uploaded = false
            }
        }

        // this so to force a refetch of posts data so we user can see newly created post
        queryClient.invalidateQueries({ queryKey: ['post'], refetchType: 'all' })

        
        setAlert({
            status: uploaded ? "success" : "error",
            message: uploaded ? "Post created successfully." : "Post creation failed."
        })

        handleClose()
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostContent(event.target.value)
    }

    // const handleFileChange = () => {
    //     const files = inputRef && inputRef.current ? inputRef.current.files : null

    //     // extract required info from files list and set the state
    //     if (files) {
    //         const list: File[] = []
    //         for (let i = 0; i < files.length; i++) {
    //             list.push(files[i])
    //         }
    //         setMaterial(list)
    //         // progress key = file.name, value = 0 (initial)
    //         setProgress(
    //             new Map(
    //                 list.map(item => [item.name, 0])
    //             )
    //         )
    //     }
    // }

    // const handleFileDeselect = (file: File) => {
    //     const controller = controllerRef.current.get(file.name)

    //     // cancel upload
    //     if (controller) {
    //         controller.abort()
    //     }

    //     if (material && progress) {
    //         setMaterial(material.filter(item => item.name !== file.name))
    //         progress.delete(file.name)
    //     }
    // }

    return (
        <>
            <Dialog fullWidth={true} maxWidth={'sm'} open={activeDialog === "create-post"} onClose={handleClose}>
                <DialogTitle>Post</DialogTitle>
                <DialogContent>
                    <form className="flex flex-col items-start gap-3 p-3" onSubmit={handleSubmit} id="subscription-form">
                        <TextField id="outlined-multiline-static" label="Write your message." multiline minRows={4} className="w-full" name="content" onChange={handleChange} />
                        {/* <label className="flex items-center gap-2" htmlFor="fileInput">
                            <ArrowUpTrayIcon className='p-1 size-8 border border-gray-800 text-gray-800 rounded-full hover:bg-gray-200 cursor-pointer' />
                        </label>
                        <input multiple onChange={handleFileChange} ref={inputRef} name="file" id="fileInput" className="hidden" type="file" />
                        {
                            material
                            &&
                            material.map(item => <MaterialCard key={item.name} handleFileDeselect={() => handleFileDeselect(item)} material={item} progress={progress?.get(item.name) as number} />)
                        } */}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={postBtnDisabled || postContent.trim().length === 0} type="submit" form="subscription-form">
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}