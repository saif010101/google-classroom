import { useContext, type Dispatch, type SetStateAction } from "react"
import { DialogContext } from "../contexts/DialogContext.tsx"


interface ContextShape {
    isDialogOpen: boolean
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const useDialogContext = (): ContextShape[] => {
    const context = useContext(DialogContext)

    if (context === undefined) {
        throw new Error("JoinClassDialogContext should be consumed inside the provider")
    }

    return context
}
