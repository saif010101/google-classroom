import type { DialogType } from "../types/DialogType"

export interface DialogContextType {
    activeDialog: DialogType,
    openJoinDialog: () => void
    openCreateDialog: () => void,
    openEditDialog: () => void,
    openCreatePostDialog: () => void,
    closeDialog: () => void
}
