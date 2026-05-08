import { useContext } from "react"
import { DialogContext } from "../contexts/DialogContext.tsx"

export const useDialogContext = () => {
    const context = useContext(DialogContext)

    if (context === undefined) {
        throw new Error("DialogContext should be consumed inside the provider")
    }

    return context
}
