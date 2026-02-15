import { useState, useRef } from "react"
import { Header } from "./components/Header.tsx"
import { Sidebar } from "./components/Sidebar/Sidebar.tsx"
import { useClickOutside } from "./hooks/useClickOutside.tsx"
import { Home } from "./components/Home/Home.tsx"
import { DialogContext } from "./contexts/DialogContext.tsx"
import { DialogHost } from "./components/Dialogs/DialogHost.tsx"

function App() {

  const sideBarRef = useRef<HTMLDivElement>(null)
  const [isSideBarOpen, setSideBarOpen] = useState<boolean>(false)

  const [activeDialog, setActiveDialog] = useState<"join" | "create" | null>(null)

  // a custom hook which closes the sidebar when clicked outside of it
  useClickOutside(sideBarRef, () => {
    setSideBarOpen(false)
  })

  return (
    <DialogContext.Provider
      value={
        {
          activeDialog,
          openJoinDialog: () => setActiveDialog("join"),
          openCreateDialog: () => setActiveDialog("create"),
          closeDialog: () => setActiveDialog(null)
        }
      }
    >
      <Header setSideBarOpen={setSideBarOpen} />
      <Sidebar ref={sideBarRef} isOpen={isSideBarOpen} />
      <Home />
      <DialogHost />
    </DialogContext.Provider>
  )
}

export default App
