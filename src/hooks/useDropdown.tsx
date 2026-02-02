import { useState } from "react"

interface DropdownData {
    anchorElem: HTMLElement | null
    handleClick: (event: React.MouseEvent<HTMLElement>) => void
    handleClose: () => void
}

export const useDropdown = (): DropdownData => {

    const [anchorElem, setAnchorElem] = useState<HTMLElement | null>(null)
    const open = anchorElem ? true : false

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElem(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorElem(null)
    }

    return { anchorElem, handleClick, handleClose }
}