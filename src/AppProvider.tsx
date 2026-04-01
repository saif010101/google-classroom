import { useState, type PropsWithChildren } from "react"
import { SidebarContext } from "./contexts/SidebarContext"
import { ClassContext, type CurrentClassInfo } from "./contexts/ClassContext"
import { AlertContext } from "./contexts/AlertContext"
import { DialogContext } from "./contexts/DialogContext"
import type { AlertType } from "./types/AlertType"
import type { DialogType } from "./types/DialogType"

export const AppProvider = ({ children }: PropsWithChildren) => {
    const [activeDialog, setActiveDialog] = useState<DialogType | null>(null)
    const [alert, setAlert] = useState<AlertType>({
        status: "pending",
        message: ""
    })
    const [currentClass, setCurrentClass] = useState<CurrentClassInfo | undefined>(undefined)

    return (
            <ClassContext.Provider value={{ currentClass, setCurrentClass }}>
                <AlertContext.Provider value={{ alert, setAlert }}>
                    <DialogContext.Provider
                        value={
                            {
                                activeDialog,
                                openJoinDialog: () => setActiveDialog("join-class"),
                                openCreateDialog: () => setActiveDialog("create-class"),
                                openEditDialog: () => setActiveDialog("edit-class"),
                                openCreatePostDialog: () => setActiveDialog("create-post"),
                                closeDialog: () => setActiveDialog(null)
                            }
                        }
                    >
                        {children}
                    </DialogContext.Provider>
                </AlertContext.Provider>
            </ClassContext.Provider>
    )
}
