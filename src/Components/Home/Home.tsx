import { ClassCard } from "../ClassCard.tsx"
import { JoinClassDialog } from "../JoinClassDialog.tsx"
import { CreateClassDialog } from "../CreateClassDialog.tsx"

export const Home = () => {
    return (
        <>
            <div className="p-4 flex flex-col gap-3 items-center ">
                <ClassCard className="Big Data Analytics" teacherName="Omar Usman Khan" />
                <ClassCard className="Big Data Analytics" teacherName="Omar Usman Khan" />
                <ClassCard className="Big Data Analytics" teacherName="Omar Usman Khan" />
            </div>
            <JoinClassDialog />
            <CreateClassDialog />
        </>
    )
}
