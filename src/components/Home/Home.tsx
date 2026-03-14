import { ClassCard } from "../ClassCard.tsx"
import { useClassData } from "../../hooks/useClassData.tsx"
import { LinearProgress, Skeleton, Alert, Slide } from "@mui/material"
import { useAlertContext } from "../../hooks/useAlertContext.tsx"
import { useClassContext } from "../../hooks/useClassContext.tsx"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

export const Home = () => {
    const { data, isLoading } = useClassData()
    const { alert } = useAlertContext()
    const { setCurrentClass } = useClassContext()
    const queryClient = useQueryClient()

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['class'], refetchType: 'all' })
        setCurrentClass(undefined)
    },[])



    return (
        <>
            <Slide direction="down" in={alert.status === 'success'} mountOnEnter unmountOnExit>
                <Alert variant="filled" severity="success" className="w-60 absolute top-3 left-1/2 -translate-x-[50%]">
                    {alert.message}
                </Alert>
            </Slide>
            {isLoading && <LinearProgress />}
            <div className="p-4 grid min-[668px]:grid-cols-2 min-[1100px]:grid-cols-3 gap-3 items-center ">
                {data ? data.map(item => (
                    <ClassCard
                        key={item.class_code}
                        class_code={item.class_code}
                        class_name={item.class_name}
                        teacher_name={item.teacher_name}
                        section={item.section}
                        role={item.role}
                    />
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
