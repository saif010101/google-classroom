import { useEffect, useRef } from "react"
import { Header } from "./components/Header.tsx"
import { Sidebar } from "./components/Sidebar/Sidebar.tsx"
import { useClickOutside } from "./hooks/useClickOutside.tsx"
import { DialogHost } from "./components/Dialogs/DialogHost.tsx"
import { useNavigate, useLocation } from "react-router"
import { useAuthContext } from "./hooks/useAuthContext.tsx"
import { AlertComponent } from "./components/AlertComponent.tsx"
import { AppProvider } from "./AppProvider.tsx"
import { useSidebarContext } from "./hooks/useSidebarContext.tsx"
import { AppRoutes } from "./AppRoutes.tsx"


function App() {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const sideBarRef = useRef<HTMLDivElement>(null)
  const { user, isError } = useAuthContext()
  const { setSidebarOpen } = useSidebarContext()

  // a custom hook which closes the sidebar when clicked outside of it
  useClickOutside(sideBarRef, () => {
    setSidebarOpen(false)
  })

  console.log(user)
  useEffect(() => {
    // if query is not pending and user is not logged in and 
    // user was not trying to access signup page then redirect him to login page
    if (isError && pathname !== '/signup') {
      navigate('/login')
    }

  }, [isError])
  return (
    <AppProvider>
      <AlertComponent />
      {user && <Header />}
      {user && <Sidebar ref={sideBarRef} />}
      <AppRoutes />
      <DialogHost />
    </AppProvider>
  )
}

export default App
