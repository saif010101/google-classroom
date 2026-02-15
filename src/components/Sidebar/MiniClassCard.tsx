import { BookOpenIcon } from "@heroicons/react/24/outline"

interface MiniClassCardProps {
    name: string
    section: string
}

export const MiniClassCard = ({ name, section }: MiniClassCardProps) => {
    return (
        <div className="flex items-center gap-5">
            <BookOpenIcon className="size-6" />
            <div className="flex flex-col">
                <span className="font-[400]">{name}</span>
                <span className="font-[300]">{section}</span>
            </div>
        </div>
    )
}
