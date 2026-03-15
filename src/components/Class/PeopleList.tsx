import { UserIcon } from "@heroicons/react/24/outline"
import type { PeopleType } from "../../types/PeopleType"

interface PeopleListProps {
    heading: string
    data: PeopleType[]
}

export const PeopleList = ({ heading, data }: PeopleListProps) => {
    return (
        <>
            <header className="px-3 py-5">
                <h1 className="text-3xl">{heading}</h1>
            </header>
            <ul className="flex flex-col">
            {data.length === 0 && <span className="text-center">No students enrolled yet.</span>}
                {data.map(user => (
                    <li className="flex items-center gap-4 py-3 px-2 border-t-1  border-gray-400">
                        <UserIcon className="size-8" />
                        <span>{user.full_name}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}
