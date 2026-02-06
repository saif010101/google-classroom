import { BookOpenIcon } from "@heroicons/react/24/outline"

export const MiniClassCard = () => {
    return (
        <div className="flex items-center gap-5">
            <BookOpenIcon className="size-6"/>
            <div className="flex flex-col">
                <span className="font-[500]">Database Systems</span>
                <span className="font-[300]">4b spring26</span>
            </div>
        </div>
    )
}
