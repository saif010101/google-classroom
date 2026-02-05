import { PencilIcon } from "@heroicons/react/24/outline"

export const NewAnnouncementBtn = () => {
    return (
        <button className="w-55 px-5 py-2 flex items-center gap-3 text-blue-900 bg-blue-300 rounded-full hover:cursor-pointer hover:shadow-xl">
            <PencilIcon className="size-4" />
            <span>New announcement</span>
        </button>
    )
}
