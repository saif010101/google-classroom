import { UserIcon } from "@heroicons/react/24/outline"

interface UserCardProps {
    name: string;
    email: string;
}

export const UserCard = ({ name, email }: UserCardProps) => {
    return (
        <div className="w-full p-2 flex gap-4 items-center rounded-full hover:cursor-pointer hover:bg-gray-200 transition duration-100 ease-in">
            <UserIcon className="size-8" />
            <div className="flex flex-col">
                <span className="text-gray-800">{name}</span>
                <span className="text-gray-800 text-xs">{email}</span>
            </div>
        </div>
    )
}