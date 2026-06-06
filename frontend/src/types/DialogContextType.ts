import type { DialogType } from "./DialogType"

export interface DialogContextType {
    activeDialog: DialogType,
    openJoinDialog: () => void
    openCreateDialog: () => void,
    openEditDialog: () => void,
    openCreatePostDialog: () => void,
    openEditPostDialog: () => void,
    openAISummaryDialog: () => void,
    closeDialog: () => void
}
