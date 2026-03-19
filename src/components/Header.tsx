import { Bars3Icon, Cog6ToothIcon, PlusIcon } from "@heroicons/react/16/solid"
import { useDropdown } from "../hooks/useDropdown.tsx"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useDialogContext } from "../hooks/useDialogContext.tsx"
import { useClassContext } from "../hooks/useClassContext.tsx"
import { useSidebarContext } from "../hooks/useSidebarContext.tsx"
import { getPeople } from "../api/getPeople.ts"
import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "../hooks/useAuthContext.tsx"

export const Header = () => {

    const { openCreateDialog, openJoinDialog } = useDialogContext()
    const { anchorElem, handleClick, handleClose, open } = useDropdown()
    const { currentClass } = useClassContext()
    const { setSidebarOpen } = useSidebarContext()
    const { openEditDialog } = useDialogContext()
    const { user } = useAuthContext()
    const { data } = useQuery({
        queryKey: ['people', currentClass?.class_code],
        queryFn: () => getPeople(currentClass?.class_code)
    })

    // if header is rendered, then user cannot be null
    // because header was conditionally rendered with user
    // so we don't need this condition but typescript is
    // complaining so i am putting it here
    if (!user) {
        return
    }

    const teacher = data?.filter(user => user.role === 'teacher').reduce(user => user)
    const isTeacher = teacher && (teacher.user_id === user.user_id)

    return (
        <header className="flex items-center gap-3 justify-between p-4 bg-gray-100">
            <Bars3Icon onClick={() => setSidebarOpen(true)} className="size-6 text-gray-700 cursor-pointer" />
            {currentClass ? (<div className="flex flex-col mr-auto">
                <span className="font-[600] text-gray-600">{currentClass.name}</span>
                <span className="text-sm text-gray-600">{currentClass.section}</span>
            </div>) : (<span className="mr-auto text-2xl font-[400] text-gray-600">Classroom</span>)}
            {isTeacher &&
                <button onClick={openEditDialog} className="p-1 rounded-full hover:bg-gray-300 cursor-pointer ">
                    <Cog6ToothIcon className="size-6 text-gray-700" />
                </button>
            }
            <div>
                {!currentClass &&
                    <button onClick={handleClick} className="cursor-pointer rounded-full hover:bg-gray-200">
                        <PlusIcon className="size-6 text-gray-700" />
                    </button>
                }
                <Menu open={open} onClose={handleClose} anchorEl={anchorElem}>
                    <MenuItem onClick={() => {
                        openJoinDialog()
                        handleClose()
                    }}>Join class</MenuItem>
                    <MenuItem onClick={() => {
                        openCreateDialog()
                        handleClose()
                    }}>Create class</MenuItem>
                </Menu>
            </div>
        </header>
    )
}