import { ClassBanner } from "./ClassBanner.tsx"
import { NewPostButton } from "../Post/NewPostButton.tsx"
import { useClassContext } from "../../hooks/useClassContext.tsx"
import { PostCard } from "../Post/PostCard.tsx"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { PostsAPIService } from "../../api/PostsAPIService.ts"

export const ClassStream = () => {

  const { class_code } = useParams()
  const { currentClass } = useClassContext()

  if (!currentClass) {
    return
  }

  const { data } = useQuery({
    queryKey: ['post', class_code],
    queryFn: () => PostsAPIService.getPosts(currentClass.class_code)
  })

  return (
    <>
      <div className="flex flex-col gap-3 p-5 grow-1">
        <ClassBanner name={currentClass.name} section={currentClass.section} />
        <NewPostButton />
        <div className="flex flex-col items-strech gap-3">
          {data && data.length > 0 ? data.map(post => <PostCard key={post.post_id} post_id={post.post_id} post_user_id={post.user_id} author={post.full_name} content={post.content} date={post.posted_at} />)
            : <p className="text-center mt-3">There are no posts for this class.</p>}
        </div>
      </div>
    </>
  )
}
