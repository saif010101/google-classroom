import { ClassBanner } from "./ClassBanner.tsx"
import { NewAnnouncementBtn } from "./NewAnnouncementBtn.tsx"
import { useClassContext } from "../../hooks/useClassContext.tsx"
import { AnnouncementCard } from "./AnnouncementCard.tsx"

export const ClassStream = () => {

  const { currentClass } = useClassContext()

  if (!currentClass){
    return
  }

  return (
    <>
      <div className="flex flex-col gap-3 p-2">
        <ClassBanner name={currentClass.name} section={currentClass.section} />
        <NewAnnouncementBtn />
        <div className="flex flex-col">
          <AnnouncementCard />
        </div>
      </div>
    </>
  )
}
