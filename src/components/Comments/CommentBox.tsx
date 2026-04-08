import { UserIcon } from "@heroicons/react/16/solid"

interface CommentBoxProps {
    author?: string
    date?: string
    content?: string
}

export const CommentBox = ({ author = 'Fasih Khan', date = 'Mar 12', content = 'pa khair alaka' }: CommentBoxProps) => {
    return (
        <div className="py-5 flex justify-between items-center gap-4 shadow-xs">
            <UserIcon className="size-8" />
            <div className='flex flex-col gap-1 mr-auto'>
                <span className='text-xs text-gray-700 font-[600]'>{author} • {date} </span>
                <span className='text-sm text-gray-900'>{content}</span>
            </div>
        </div>
    )
}
