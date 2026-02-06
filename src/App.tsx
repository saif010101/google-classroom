import { useState, useRef } from "react"
import { Header } from "./Components/Header.tsx"
import { Sidebar } from "./Components/Sidebar/Sidebar.tsx"
import { useClickOutside } from "./hooks/useClickOutside.tsx"
import { Home } from "./Components/Home/Home.tsx"
import { DialogContext } from "./contexts/DialogContext.tsx"

function App() {

  const sideBarRef = useRef<HTMLDivElement>(null)
  const [isSideBarOpen, setSideBarOpen] = useState<boolean>(false)
  const [isJoinDialogOpen, setisJoinDialogOpen] = useState<boolean>(false)
  const [isCreateDialogOpen, setisCreateDialogOpen] = useState<boolean>(false)

  // a custom hook which closes the sidebar when clicked outside of it
  useClickOutside(sideBarRef, () => {
    setSideBarOpen(false)
  })

  return (
    <DialogContext.Provider
      value={
        [
          {
            isDialogOpen: isJoinDialogOpen,
            setIsDialogOpen: setisJoinDialogOpen
          },
          {
            isDialogOpen: isCreateDialogOpen,
            setIsDialogOpen: setisCreateDialogOpen
          }
        ]
      }
    >
      <Header setSideBarOpen={setSideBarOpen} />
      <Sidebar ref={sideBarRef} isOpen={isSideBarOpen} />
      <Home />
    </DialogContext.Provider>
  )
}

export default App
