import { useContext } from "react"
import { DialogContext } from "../contexts/DialogContext.tsx"

type DialogType = "join" | "create" | null

interface ContextShape {
    activeDialog: DialogType,
    openJoinDialog: () => void
    openCreateDialog: () => void,
    closeDialog: () => void
}

export const useDialogContext = (): ContextShape => {
    const context = useContext(DialogContext)

    if (context === undefined) {
        throw new Error("JoinClassDialogContext should be consumed inside the provider")
    }

    return context
}
