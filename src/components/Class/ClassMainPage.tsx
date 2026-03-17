import { ClassNavbar } from "./ClassNavbar.tsx"
import { Outlet, useParams } from "react-router"
import { useClassContext } from "../../hooks/useClassContext.tsx"
import { LinearProgress } from "@mui/material"
import { useEffect } from "react"
import { getClass } from "../../api/getClass.ts"
import { useQuery } from "@tanstack/react-query"


export const ClassMainPage = () => {

  const { class_code } = useParams()
  const { currentClass, setCurrentClass } = useClassContext()

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['class', class_code],
    queryFn: () => getClass(class_code)
  })

  useEffect(() => {
    if (isSuccess) {
      setCurrentClass(data)
    }
  }, [data])

  if (isLoading) {
    return <LinearProgress />
  }

  return (
    <>
      {currentClass && <ClassNavbar />}
      {currentClass && <Outlet />}
    </>
  )
}
