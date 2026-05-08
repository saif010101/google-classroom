import { useState, type PropsWithChildren } from "react"
import { SidebarContext } from "./contexts/SidebarContext"


export const SidebarProvider = ({children} : PropsWithChildren) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    return (<SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
        {children}
    </SidebarContext.Provider>
    )
}
