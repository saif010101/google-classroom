import type { CommentType } from "../../types/CommentType"
import { CommentBox } from "./CommentBox"

interface CommentsListProps {
    data: CommentType[]
}

export const CommentsList = ({ data }: CommentsListProps) => {
    return (
        <ul>
            {data.map(item => (
                <li key={item.comment_id}>
                    <CommentBox author={item.name} content={item.content} date={item.posted_at} />
                </li>
            ))}
        </ul>
    )
}
