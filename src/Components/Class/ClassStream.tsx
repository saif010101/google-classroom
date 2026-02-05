import { ClassBanner } from "./ClassBanner.tsx"
import { NewAnnouncementBtn } from "./NewAnnouncementBtn.tsx"
import { AnnouncmentCard } from "./AnnouncmentCard.tsx"

export const ClassStream = () => {
  return (
    <div className="flex flex-col gap-3">
        <ClassBanner className="Database Systems" classSection="4B Spring26"/>
        <NewAnnouncementBtn />
        <div className="flex flex-col">
          <AnnouncmentCard />
        </div>
    </div>
  )
}
