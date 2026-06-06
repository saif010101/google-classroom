import { useState, type PropsWithChildren } from "react"
import { ClassContext, type CurrentClassInfo } from "./contexts/ClassContext"
import { PostContext, type CurrentPostInfo } from "./contexts/PostContext"
import { AlertContext } from "./contexts/AlertContext"
import { DialogContext } from "./contexts/DialogContext"
import type { AlertType } from "./types/AlertType"
import type { DialogType } from "./types/DialogType"

export const AppProvider = ({ children }: PropsWithChildren) => {
    const [activeDialog, setActiveDialog] = useState<DialogType | null>(null)
    const [alert, setAlert] = useState<AlertType>({
        status: "close",
        message: ""
    })
    const [currentClass, setCurrentClass] = useState<CurrentClassInfo | undefined>(undefined)
    const [currentPost, setCurrentPost] = useState<CurrentPostInfo | undefined>(undefined)
    return (
        <ClassContext.Provider value={{ currentClass, setCurrentClass }}>
            <PostContext.Provider value={{ currentPost, setCurrentPost }}>
                <AlertContext.Provider value={{ alert, setAlert }}>
                    <DialogContext.Provider
                        value={
                            {
                                activeDialog,
                                openJoinDialog: () => setActiveDialog("join-class"),
                                openCreateDialog: () => setActiveDialog("create-class"),
                                openEditDialog: () => setActiveDialog("edit-class"),
                                openCreatePostDialog: () => setActiveDialog("create-post"),
                                openEditPostDialog: () => setActiveDialog("edit-post"),
                                openAISummaryDialog: () => setActiveDialog("ai-summary"),
                                closeDialog: () => setActiveDialog(null)
                            }
                        }
                    >
                        {children}
                    </DialogContext.Provider>
                </AlertContext.Provider>
            </PostContext.Provider>
        </ClassContext.Provider>
    )
}
