import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useDropdown } from "../../hooks/useDropdown.tsx"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAlertContext } from "../../hooks/useAlertContext.tsx"
import { useNavigate } from "react-router"
import { Snackbar } from "@mui/material"
import { ClassAPIService } from "../../api/ClassAPIService.ts"

interface ClassCardProps {
    class_code: string
    class_name: string
    teacher_name: string
    section: string
    role: string
}

export const ClassCard = ({ class_code, class_name, teacher_name, section, role }: ClassCardProps) => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { setAlert } = useAlertContext()

    const mutate = useMutation({
        mutationFn: () => role === 'teacher' ? ClassAPIService.deleteClass(class_code) : ClassAPIService.leaveClass({ class_code }),
        onSuccess: () => {
            // this so to force a refetch of class data so we user can see newly created class
            queryClient.invalidateQueries({ queryKey: ['classData'], refetchType: 'all' })
            // i am using setTimeout so that the alert disappears after 2 seconds
            // since i cannot think of a way to set alert state besides this
            setAlert({
                status: "success",
                message: `Class ${role === 'teacher' ? 'deleted' : 'unenrolled'} successfully`
            })
        }
    })

    const { anchorElem, handleClick, handleClose, open } = useDropdown()

    const handleDeleteClick = () => {
        mutate.mutate()
        handleClose()
    }

    const handleClassClick = (class_code: string) => {
        navigate(`/c/${class_code}/stream`)
    }

    return (
        <>
            <div className="w-[375px] border border-gray-400 rounded-xl overflow-hidden hover:shadow-xl hover:cursor-pointer">
                <div onClick={() => handleClassClick(class_code)} className="p-4 flex flex-col gap-2 bg-[#00c441] text-white">
                    <p className="text-2xl hover:underline truncate">{class_name}</p>
                    <span className="text-sm hover:underline">{section}</span>
                    <span className="text-sm">{teacher_name}</span>
                </div>
                <div className="h-30 relative"></div>
                <div className="w-full p-3 flex justify-end border-t-1 border-gray-400 ">
                    <button id="basic-button" className="cursor-pointer" onClick={handleClick} >
                        <EllipsisVerticalIcon className="size-6" />
                    </button>
                    <Menu open={open} onClose={handleClose} anchorEl={anchorElem}>
                        <MenuItem onClick={handleDeleteClick}>{role === 'teacher' ? 'Delete' : 'Unenroll'}</MenuItem>
                    </Menu>
                </div>
            </div>
        </>
    )
}
