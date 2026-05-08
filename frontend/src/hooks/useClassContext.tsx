import { useContext } from "react"
import { ClassContext } from "../contexts/ClassContext"

export const useClassContext = () => {
    const context = useContext(ClassContext)

    if (!context) {
        throw new Error("ClassContext should be consumed inside the provider")
    }

    return context
}