import { LinearProgress } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getComments } from "../../api/getComments"
import { AddComment } from "../Comments/AddComment"
import { CommentInputBox } from "../Comments/CommentInputBox"
import { TotalComments } from "../Comments/TotalComments"
import { CommentsList } from "../Comments/CommentsList"
import { CommentBox } from "../Comments/CommentBox"
import { useParams } from "react-router"


interface PostCardCommentsProps {
    post_id: number
}

export const PostCardComments = ({ post_id }: PostCardCommentsProps) => {
    const { class_code } = useParams()
    const [inputActive, setInputActive] = useState(false)
    const [commentListActive, setCommentListActive] = useState(false)
    const { data, isFetching } = useQuery({
        queryKey: ['comments', class_code, post_id],
        queryFn: () => getComments(post_id)
    })

    if (isFetching) {
        return <LinearProgress />
    }

    const doesDataExists = () => {
        return data && data.length > 0
    }

    return (
        <div className='p-5 border-t-1 border-gray-300'>
            {/* if there is atleast one comment, don't show Add Comment UI */}
            {doesDataExists() ?
                <TotalComments setCommentListActive={setCommentListActive} commentsCount={data.length} />
                :
                <AddComment setInputActive={setInputActive} />
            }
            {/*  it will show all comments, its state is toggled by Total Comments UI */}
            {commentListActive && <CommentsList data={data} />}
            {/* if there is atleast one comment and comment list is not active then show the most recent comment */}
            {doesDataExists() && !commentListActive && <CommentBox author_id={data[0].user_id} author={data[0].name} content={data[0].content} date={data[0].posted_at} />}
            {/* if there is atleast one comment, the comment input box will show
            else user will need to click on Add Comment UI to render it */}
            {(inputActive || doesDataExists()) && <CommentInputBox post_id={post_id} />}
        </div>
    )
}
