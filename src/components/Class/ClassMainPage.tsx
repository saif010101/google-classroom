import { ClassNavbar } from "./ClassNavbar.tsx"
import { Outlet } from "react-router"
import { useClassContext } from "../../hooks/useClassContext.tsx"


export const ClassMainPage = () => {

  // i am using this to conditionally render class navbar
  const { currentClass } = useClassContext()

  return (
    <>
      {currentClass && <ClassNavbar />}
      <Outlet />
    </>
  )
}
