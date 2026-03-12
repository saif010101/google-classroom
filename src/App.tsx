import { useState, useRef, useContext, useEffect } from "react"
import { Header } from "./components/Header.tsx"
import { Sidebar } from "./components/Sidebar/Sidebar.tsx"
import { useClickOutside } from "./hooks/useClickOutside.tsx"
import { Home } from "./components/Home/Home.tsx"
import { DialogContext } from "./contexts/DialogContext.tsx"
import { DialogHost } from "./components/Dialogs/DialogHost.tsx"
import { Signup } from "./pages/Signup.tsx"
import { Login } from "./pages/Login.tsx"
import { Routes, Route, useNavigate } from "react-router"
import { AuthContext } from "./contexts/AuthContext.tsx"
import { AlertContext } from "./contexts/AlertContext.tsx"
import type { AlertType } from "./types/AlertType.ts"
import { ClassStream } from "./components/Class/ClassStream.tsx"




function App() {

  const navigate = useNavigate()
  const sideBarRef = useRef<HTMLDivElement>(null)
  const [isSideBarOpen, setSideBarOpen] = useState<boolean>(false)
  const [activeDialog, setActiveDialog] = useState<"join" | "create" | null>(null)
  const [alert, setAlert] = useState<AlertType>({
    status: "pending",
    message: ""
  })
  

  // a custom hook which closes the sidebar when clicked outside of it
  useClickOutside(sideBarRef, () => {
    setSideBarOpen(false)
  })

  const authContext = useContext(AuthContext)

  if (!authContext) {
    return null
  }

  const { user } = authContext

  // useEffect(() => {
  //   if (!isPending && !user) {
  //     navigate('/signup')
  //   }
  // }, [isPending])

  return (
      <AlertContext.Provider value={{ alert, setAlert }}>
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
          {user && <Header setSideBarOpen={setSideBarOpen} />}
          {user && <Sidebar ref={sideBarRef} isOpen={isSideBarOpen} />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/c/:class_code" element={<ClassStream />} />
          </Routes>
          <DialogHost />
        </DialogContext.Provider>
      </AlertContext.Provider>
  )
}

export default App
