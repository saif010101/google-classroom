import { useState } from "react"

interface DropdownData {
    anchorElem: HTMLElement | null
    handleClick: (event: React.MouseEvent<HTMLElement>) => void
    handleClose: () => void
    open : boolean
}

export const useDropdown = (): DropdownData => {

    const [anchorElem, setAnchorElem] = useState<HTMLElement | null>(null)
    const open = Boolean(anchorElem)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElem(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorElem(null)
    }

    return { anchorElem, handleClick, handleClose, open }
}