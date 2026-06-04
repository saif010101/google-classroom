import { useState } from "react"
import { useClassContext } from "../../hooks/useClassContext"

interface ClassStreamProps {
    name: string
    section: string
}

export const ClassBanner = ({ name, section }: ClassStreamProps) => {
    const { currentClass } = useClassContext()
    const [showCode, setShowCode] = useState(false)

    const toggleShowCode = () => {
        setShowCode(prev => !prev)
    }
    return (
        <div className="relative h-[240px] p-6  bg-red-400 rounded-xl">
            <div className="flex flex-col gap-2 text-white">
                <p className="text-4xl">{name}</p>
                <p className="text-xl">{section}</p>
            </div>
            <div onClick={toggleShowCode} className="inset-shadow-sm shadow-lg w-40 text-center p-3 bg-white rounded-xl absolute bottom-5 right-5 cursor-pointer hover:bg-gray-100">{showCode ? currentClass?.class_code : 'Show class code'}</div>
        </div>
    )
}
