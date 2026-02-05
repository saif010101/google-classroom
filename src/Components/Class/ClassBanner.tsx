interface ClassStreamProps {
    className: string
    classSection: string
}

export const ClassBanner = ({ className, classSection }: ClassStreamProps) => {
    return (
        <div className="h-48 px-2 py-4 bg-red-400 rounded-xl">
            <div className="flex flex-col gap-2 text-white">
                <p className="text-4xl">{className}</p>
                <p>{classSection}</p>
            </div>
        </div>
    )
}
