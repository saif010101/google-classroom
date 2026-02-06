import { createContext, type Dispatch, type SetStateAction } from "react"

interface ContextShape {
    isDialogOpen: boolean
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const DialogContext = createContext<ContextShape[] | undefined>(undefined)