import { useContext } from "react"
import { DialogContext } from "../contexts/DialogContext.tsx"
import type { DialogType } from "../types/DialogType.ts"

interface ContextShape {
    activeDialog: DialogType,
    openJoinDialog: () => void
    openCreateDialog: () => void,
    openEditDialog: () => void,
    closeDialog: () => void
}

export const useDialogContext = (): ContextShape => {
    const context = useContext(DialogContext)

    if (context === undefined) {
        throw new Error("DialogContext should be consumed inside the provider")
    }

    return context
}
