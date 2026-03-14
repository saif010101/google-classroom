import { useQuery } from "@tanstack/react-query"
import { ClassBanner } from "./ClassBanner.tsx"
import { NewAnnouncementBtn } from "./NewAnnouncementBtn.tsx"
import { useParams } from "react-router"
import { getClass } from "../../api/getClass.ts"
import { LinearProgress } from "@mui/material"
import { useClassContext } from "../../hooks/useClassContext.tsx"
import { useEffect } from "react"
// import { AnnouncementCard } from "./AnnouncementCard.tsx"

export const ClassStream = () => {

  const { class_code } = useParams()
  const { setCurrentClass } = useClassContext()
  console.log(class_code)
  const { data, isLoading, isSuccess,refetch } = useQuery({
    queryKey: ['class'],
    queryFn: () => getClass(class_code)
  })

  // console.log(data)

  useEffect(() => {
    if (isSuccess) {
      setCurrentClass(data)
    }
  }, [data])

  // this is to force refetch when user navigates between classes through sidebar
  useEffect(() => {
    refetch()
  }, [class_code])

  if (isLoading) {
    return <LinearProgress />
  }


  return (
    <>
      <div className="flex flex-col gap-3 p-2">
        <ClassBanner name={data.name} section={data.section} />
        <NewAnnouncementBtn />
        <div className="flex flex-col">
          {/* <AnnouncementCard /> */}
        </div>
      </div>
    </>
  )
}
