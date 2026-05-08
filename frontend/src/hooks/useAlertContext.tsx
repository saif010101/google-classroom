import { useContext } from "react"
import { AlertContext } from "../contexts/AlertContext"

export const useAlertContext = () => {
    const context = useContext(AlertContext)

    if (!context) {
        throw new Error("AlertContext should be consumed inside the provider")
    }

    return context
}