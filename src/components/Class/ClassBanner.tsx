interface ClassStreamProps {
    name: string
    section: string
}

export const ClassBanner = ({ name, section }: ClassStreamProps) => {
    return (
        <div className="h-48 px-2 py-4 bg-red-400 rounded-xl">
            <div className="flex flex-col gap-2 text-white">
                <p className="text-4xl">{name}</p>
                <p>{section}</p>
            </div>
        </div>
    )
}
