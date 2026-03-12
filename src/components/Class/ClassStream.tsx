import { useQuery } from "@tanstack/react-query"
import { ClassBanner } from "./ClassBanner.tsx"
import { NewAnnouncementBtn } from "./NewAnnouncementBtn.tsx"
import { useParams } from "react-router"
import { getClass } from "../../api/getClass.ts"
import { LinearProgress } from "@mui/material"
import { useClassContext } from "../../hooks/useClassContext.tsx"
// import { AnnouncementCard } from "./AnnouncementCard.tsx"

export const ClassStream = () => {

  const { class_code } = useParams()
  const { setCurrentClass } = useClassContext()

  if (!class_code) {
    return <h1>Bad Request</h1>
  }
  const { data, isLoading,isSuccess } = useQuery({
    queryKey: ['class'],
    queryFn: () => getClass(class_code)
  })

  if (isLoading) {
    return <LinearProgress />
  }

  if (isSuccess){
    setCurrentClass(data)
  }

  return (

    <div className="flex flex-col gap-3 p-2">
      <ClassBanner name={data.name} section={data.section} />
      <NewAnnouncementBtn />
      <div className="flex flex-col">
        {/* <AnnouncementCard /> */}
      </div>
    </div>
  )
}
