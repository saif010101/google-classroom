import { BookOpenIcon } from "@heroicons/react/24/outline"

interface MiniClassCardProps {
    name: string
    section: string
}

export const MiniClassCard = ({ name, section }: MiniClassCardProps) => {
    return (
        <div className="flex items-center gap-5 ">
            <BookOpenIcon className="size-6" />
            <div className="flex flex-col">
                <p className="font-[400] ">{name}</p>
                <p className="font-[300]">{section}</p>
            </div>
        </div>
    )
}
