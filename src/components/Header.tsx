import { Bars3Icon, PlusIcon } from "@heroicons/react/16/solid"
// import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { useDropdown } from "../hooks/useDropdown.tsx"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useDialogContext } from "../hooks/useDialogContext.tsx"
import { useClassContext } from "../hooks/useClassContext.tsx"
import { useSidebarContext } from "../hooks/useSidebarContext.tsx"



export const Header = () => {

    const { openCreateDialog, openJoinDialog } = useDialogContext()
    const { anchorElem, handleClick, handleClose, open } = useDropdown()
    const { currentClass } = useClassContext()
    const { setSidebarOpen } = useSidebarContext()

    return (
        <header className="flex items-center gap-3 justify-between p-4 bg-gray-100">
            <Bars3Icon onClick={() => setSidebarOpen(true)} className="size-6 text-gray-700 cursor-pointer" />
            {currentClass ? (<div className="flex flex-col mr-auto">
                <span className="font-[600] text-gray-600">{currentClass.name}</span>
                <span className="text-sm text-gray-600">{currentClass.section}</span>
            </div>) : (<span className="mr-auto text-2xl font-[400] text-gray-600">Classroom</span>)}
            {/* <Cog6ToothIcon className="size-6 text-gray-700" />n */}
            <div>
                <button onClick={handleClick} className="cursor-pointer rounded-full hover:bg-gray-200">
                    <PlusIcon className="size-6 text-gray-700" />
                </button>
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