import { ClassCard } from "../ClassCard.tsx"
import { useClassData } from "../../hooks/useClassData.tsx"
import { LinearProgress, Skeleton, Alert, Slide } from "@mui/material"
import { AlertContext } from "../../contexts/AlertContext.tsx"
import { useContext } from "react"



export const Home = () => {
    const { data, isLoading } = useClassData()
    const alertContext = useContext(AlertContext)

    return (
        <>
            <Slide direction="down" in={alertContext?.alert === 'success'} mountOnEnter unmountOnExit>
                <Alert variant="filled" severity="success" className="w-60 absolute top-3 left-1/2 -translate-x-[50%]">
                    Class created succesfully
                </Alert>
            </Slide>
            {isLoading && <LinearProgress />}
            <div className="p-4 grid min-[668px]:grid-cols-2 min-[1100px]:grid-cols-3 gap-3 items-center ">
                {data ? data.map(item => (
                    <ClassCard key={item.class_code} courseName={item.class_name} teacherName={item.teacher_name} section={item.section} />
                )) : (
                    <>
                        <Skeleton sx={{ bgcolor: "#e4e7ed", borderRadius: '0.75rem' }} variant="rounded" width={370} height={250} />
                        <Skeleton sx={{ bgcolor: "#e4e7ed", borderRadius: '0.75rem' }} variant="rounded" width={370} height={250} />
                        <Skeleton sx={{ bgcolor: "#e4e7ed", borderRadius: '0.75rem' }} variant="rounded" width={370} height={250} />
                    </>
                )}
            </div>
        </>
    )
}
