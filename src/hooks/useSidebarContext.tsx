import { useContext } from "react"
import { SidebarContext } from "../contexts/SidebarContext"

export const useSidebarContext = () => {
    const context = useContext(SidebarContext)

    if (!context) {
        throw new Error("SidebarContext should be consumed inside the provider")
    }

    return context
}