interface ClassStreamProps {
    name: string
    section: string
}

export const ClassBanner = ({ name, section }: ClassStreamProps) => {
    return (
        <div className="h-[240px] p-6  bg-red-400 rounded-xl">
            <div className="flex flex-col gap-2 text-white">
                <p className="text-4xl">{name}</p>
                <p className="text-xl">{section}</p>
            </div>
        </div>
    )
}
