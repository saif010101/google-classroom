import { CircularProgress } from "@mui/material"

interface CircularProgressWithLabelProps {
    progress: number
}

export const CircularProgressWithLabel = ({ progress }: CircularProgressWithLabelProps) => {
    return (
        <div className='relative'>
            <CircularProgress
                enableTrackSlot
                variant="determinate"
                color="secondary"
                value={progress}
                aria-label="Upload photos"
                size={40}
            />
            <span className='absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[60%] text-xs'>{progress}%</span>
        </div>
    )
}
