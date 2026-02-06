import { ClassBanner } from "./ClassBanner.tsx"
import { NewAnnouncementBtn } from "./NewAnnouncementBtn.tsx"
import { AnnouncementCard } from "./AnnouncementCard.tsx"

export const ClassStream = () => {
  return (
    <div className="flex flex-col gap-3">
        <ClassBanner name="Database Systems" section="4B Spring26"/>
        <NewAnnouncementBtn />
        <div className="flex flex-col">
          <AnnouncementCard />
        </div>
    </div>
  )
}
