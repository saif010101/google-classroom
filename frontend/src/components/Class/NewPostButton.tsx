import { PencilIcon } from "@heroicons/react/24/outline"
import { useDialogContext } from "../../hooks/useDialogContext"

export const NewPostButton = () => {
    const { openCreatePostDialog } = useDialogContext()
    return (
        <button onClick={openCreatePostDialog} className="self-start px-5 py-2 flex items-center gap-3 text-blue-900 bg-blue-300 hover:bg-blue-200 rounded-full cursor-pointer ">
            <PencilIcon className="size-5" />
            <span>New post</span>
        </button>
    )
}
