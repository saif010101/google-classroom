import { ClassNavbar } from "./ClassNavbar.tsx"
import { Outlet, useParams } from "react-router"
import { useClassContext } from "../../hooks/useClassContext.tsx"
import { LinearProgress } from "@mui/material"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { ClassAPIService } from "../../api/ClassAPIService.ts"


export const ClassMainPage = () => {

  const { class_code } = useParams()
  const { currentClass, setCurrentClass } = useClassContext()

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['class', class_code],
    queryFn: () => ClassAPIService.getClass(class_code)
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
    <div className="grow-1">
      {currentClass && <ClassNavbar />}
      <div className="flex max-w-[882px] mx-auto">
        {currentClass && <Outlet />}
      </div>
    </div>
  )
}
