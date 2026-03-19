import { createContext } from "react"
import type { DialogType } from "../types/DialogType"

interface ContextShape {
    activeDialog: DialogType,
    openJoinDialog: () => void
    openCreateDialog: () => void,
    openEditDialog: () => void,
    closeDialog: () => void
}

export const DialogContext = createContext<ContextShape | undefined>(undefined)