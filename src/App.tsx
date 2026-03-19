import { useRef} from "react"
import { Header } from "./components/Header.tsx"
import { Sidebar } from "./components/Sidebar/Sidebar.tsx"
import { useClickOutside } from "./hooks/useClickOutside.tsx"
import { Home } from "./components/Home/Home.tsx"
import { DialogHost } from "./components/Dialogs/DialogHost.tsx"
import { Signup } from "./pages/Signup.tsx"
import { Login } from "./pages/Login.tsx"
import { Routes, Route} from "react-router"
import { ClassMainPage } from "./components/Class/ClassMainPage.tsx"
import { ClassStream } from "./components/Class/ClassStream.tsx"
import { ClassPeople } from "./components/Class/ClassPeople.tsx"
import { useAuthContext } from "./hooks/useAuthContext.tsx"
import { AlertComponent } from "./components/AlertComponent.tsx"
import { AppProvider } from "./AppProvider.tsx"
import { useSidebarContext } from "./hooks/useSidebarContext.tsx"



function App() {

  const sideBarRef = useRef<HTMLDivElement>(null)
  const { user } = useAuthContext()
  const { setSidebarOpen } = useSidebarContext()
  // a custom hook which closes the sidebar when clicked outside of it
  useClickOutside(sideBarRef, () => {
    setSidebarOpen(false)
  })
  return (
    <AppProvider>
      <AlertComponent />
      {user && <Header />}
      {user && <Sidebar ref={sideBarRef} />}
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
    </AppProvider>

  )
}

export default App
