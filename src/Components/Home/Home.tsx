import { ClassCard } from "../ClassCard.tsx"
import { JoinClassDialog } from "../JoinClassDialog.tsx"
import { CreateClassDialog } from "../CreateClassDialog.tsx"

export const Home = () => {
    return (
        <>
            <div className="p-4 grid min-[668px]:grid-cols-2 gap-3 items-center ">
                <ClassCard className="Big Data Analytics" teacherName="Omar Usman Khan" />
                <ClassCard className="Big Data Analytics" teacherName="Omar Usman Khan" />
                <ClassCard className="Big Data Analytics" teacherName="Omar Usman Khan" />
            </div>
            <JoinClassDialog />
            <CreateClassDialog />
        </>
    )
}
