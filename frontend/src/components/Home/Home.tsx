import { ClassCard } from "../Class/ClassCard.tsx"
import { useClassData } from "../../hooks/useClassData.tsx"
import { LinearProgress, Skeleton} from "@mui/material"
import { useClassContext } from "../../hooks/useClassContext.tsx"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

export const Home = () => {
    const { data, isLoading } = useClassData()
    const { setCurrentClass } = useClassContext()
    const queryClient = useQueryClient()

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['class'], refetchType: 'all' })
        setCurrentClass(undefined)
    }, [])
    
    return (
        <>
            {isLoading && <LinearProgress />}
            {data?.length === 0 && <p className="text-gray-800 text-center mt-5 p-2">You are not teaching any class, neither are you enrolled. Click on the + icon at the top right corner to join or create a new class.</p>}
            <div className="p-5 grid min-[668px]:grid-cols-[repeat(2,375px)] min-[987px]:grid-cols-[repeat(3,375px)] gap-3 items-center rounded-3xl">
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
