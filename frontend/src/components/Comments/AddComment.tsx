import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/16/solid"

interface AddCommentProps {
    setInputActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddComment = ({ setInputActive }: AddCommentProps) => {
    return (
        <div onClick={() => setInputActive(true)} className='w-46 px-4 py-2 flex gap-2 items-center hover:cursor-pointer hover:bg-blue-100 rounded-full'>
            <ChatBubbleBottomCenterTextIcon className='size-6 text-blue-700' />
            <span className='text-blue-700 font-[500]'>Add comment</span>
        </div>
    )
}
