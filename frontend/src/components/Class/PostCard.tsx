import { MaterialsBox } from './MaterialsBox'
import { PostCardComments } from './PostCardComments'
import { PostCardHeader } from './PostCardHeader'

interface PostCardProps {
    author: string
    date: string
    content: string
    post_user_id: number
    post_id: number
}

export const PostCard = (props: PostCardProps) => {

    return (
        <div className='bg-gray-200 rounded-xl'>
            <PostCardHeader {...props} />
            <p className='px-5 py-5 whitespace-pre-line whitespace-break-spaces'>
                {props.content}
            </p>
            <MaterialsBox post_id={props.post_id}/>
            <PostCardComments post_id={props.post_id} />
        </div>
    )
}
