import { Divider } from "@mui/material"
import { CircularProgressWithLabel } from "../CircularProgressWithLabel"
import { XCircleIcon } from "@heroicons/react/16/solid"

interface Material {
    file_name: string,
    content_type: string,
    file_size: string
}

interface MaterialCardProps {
    handleFileDeselect : () => void
    material : Material,
    progress : number
}

export const MaterialCard = ({handleFileDeselect, material,progress} : MaterialCardProps) => {
    return (
        <div className='relative w-full p-2 flex justify-between items-center gap-3 inset-shadow-sm bg-gray-200 text-gray-700 self-start rounded-lg font-medium'>
            <p className='break-all'>{material.file_name} - {material.file_size}</p>
            <Divider orientation="vertical" flexItem />
            <CircularProgressWithLabel progress={progress} />
            <XCircleIcon onClick={handleFileDeselect} className='cursor-pointer hover:text-gray-500 size-6 absolute -top-4 -right-2' />
        </div>
    )
}
