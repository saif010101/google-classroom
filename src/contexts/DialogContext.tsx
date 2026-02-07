import { createContext } from "react"

type DialogType = "join" | "create" | null

interface ContextShape {
    activeDialog: DialogType,
    openJoinDialog: () => void
    openCreateDialog: () => void,
    closeDialog: () => void
}

export const DialogContext = createContext<ContextShape | undefined>(undefined)