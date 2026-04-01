import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/16/solid'
import { PostCardHeader } from './PostCardHeader'

interface PostCardProps {
    author: string
    date: string
    content: string
    post_user_id: number
    post_id: number
}

export const PostCard = ({ post_id, post_user_id, author, date, content }: PostCardProps) => {

    return (
        <div className='bg-gray-200 rounded-xl'>
            <PostCardHeader post_id={post_id} author={author} date={date} post_user_id={post_user_id} />
            <p className='px-5 py-2 whitespace-pre-line whitespace-break-spaces'>
                {content}
            </p>
            <div className='p-5 border-t-1 border-gray-300'>
                <div className='w-46 px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-blue-100 rounded-full'>
                    <ChatBubbleBottomCenterTextIcon className='size-6 text-blue-700' />
                    <span className='text-blue-700 font-[500]'>Add comment</span>
                </div>
            </div>
        </div>
    )
}
