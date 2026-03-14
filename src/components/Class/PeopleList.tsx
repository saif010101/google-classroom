import { UserIcon } from "@heroicons/react/24/outline"

interface PeopleListProps {
    heading: string
}
export const PeopleList = ({ heading }: PeopleListProps) => {
    return (
        <>
            <header className="px-3 py-5">
                <h1 className="text-3xl">{heading}</h1>
            </header>
            <ul className="flex flex-col">
                <li className="flex items-center gap-4 py-3 px-2 border-t-1  border-gray-400">
                    <UserIcon className="size-8" />
                    <span>Shoaib Khan</span>
                </li>
                <li className="flex items-center py-3 px-2 gap-4 border-t-1  border-gray-400">
                    <UserIcon className="size-8" />
                    <span>Muhammad Saif</span>
                </li>
            </ul>
        </>
    )
}
