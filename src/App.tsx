import { useState, useRef, useContext } from "react"
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
import { ClassContext, type CurrentClassInfo } from "./contexts/ClassContext.ts"
import { ClassMainPage } from "./components/Class/ClassMainPage.tsx"
import { ClassStream } from "./components/Class/ClassStream.tsx"
import { ClassPeople } from "./components/Class/ClassPeople.tsx"
import { SidebarContext } from "./contexts/SidebarContext.tsx"



function App() {

  const navigate = useNavigate()
  const sideBarRef = useRef<HTMLDivElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [activeDialog, setActiveDialog] = useState<"join" | "create" | null>(null)
  const [alert, setAlert] = useState<AlertType>({
    status: "pending",
    message: ""
  })
  const [currentClass, setCurrentClass] = useState<CurrentClassInfo | undefined>(undefined)


  // a custom hook which closes the sidebar when clicked outside of it
  useClickOutside(sideBarRef, () => {
    setSidebarOpen(false)
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
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <ClassContext.Provider value={{ currentClass, setCurrentClass }}>
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
            {user && <Header/>}
            {user && <Sidebar ref={sideBarRef}/>}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/c/:class_code" element={<ClassMainPage />}>
                <Route path="stream" element={<ClassStream />} />
                <Route path="people" element={<ClassPeople />} />
              </Route>
            </Routes>
            <DialogHost />
          </DialogContext.Provider>
        </AlertContext.Provider>
      </ClassContext.Provider>
    </SidebarContext.Provider>
  )
}

export default App
