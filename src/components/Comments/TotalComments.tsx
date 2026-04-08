import { UsersIcon } from "@heroicons/react/24/outline"

interface TotalCommentsProps {
    commentsCount?: number
    setCommentListActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const TotalComments = ({ commentsCount = 5,setCommentListActive }: TotalCommentsProps) => {
    return (
        <div onClick={() => setCommentListActive(prev => !prev)} className='w-51 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-blue-100 rounded-full'>
            <UsersIcon className='size-6 text-blue-700' />
            <span className='text-blue-700 font-[500]'>{commentsCount} class comments</span>
        </div>
    )
}
