import { Divider } from "@mui/material"
import { CircularProgressWithLabel } from "../CircularProgressWithLabel"
import { XCircleIcon } from "@heroicons/react/16/solid"

interface MaterialCardProps {
    handleFileDeselect : () => void
    material : File,
    progress : number
}

const bytesToReadable = new Intl.NumberFormat('en', { notation: 'compact', style: 'unit', unit: 'byte', unitDisplay: 'narrow' }).format;


export const MaterialCard = ({handleFileDeselect, material,progress} : MaterialCardProps) => {
    return (
        <div className='relative w-full p-2 flex justify-between items-center gap-3 inset-shadow-sm bg-gray-200 text-gray-700 self-start rounded-lg font-medium'>
            <p className='break-all'>{material.name} - {bytesToReadable(material.size)}</p>
            <Divider orientation="vertical" flexItem />
            <CircularProgressWithLabel progress={progress} />
            <XCircleIcon onClick={handleFileDeselect} className='cursor-pointer hover:text-gray-500 size-6 absolute -top-4 -right-2' />
        </div>
    )
}
