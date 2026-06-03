import { Button } from '@mui/material'
import { MoonLoader } from 'react-spinners'

export const SubmitButtonWithSpinner = ({ isDisabled, label, isPending }: { label: string, isPending: boolean, isDisabled : boolean }) => {
    return (
        <Button disabled={isDisabled} className="flex items-center gap-3" type="submit" variant="contained" color="success">
            <MoonLoader size={20} loading={isPending} />
            <span>{label}</span>
        </Button>
    )
}
