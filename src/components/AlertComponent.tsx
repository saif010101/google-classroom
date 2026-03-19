import { Alert, Slide } from "@mui/material"
import { useAlertContext } from "../hooks/useAlertContext"

export const AlertComponent = () => {
    const { alert } = useAlertContext()
    return (
        <Slide direction="down" in={alert.status === 'success'} mountOnEnter unmountOnExit>
            <Alert variant="filled" severity="success" className="w-60 absolute top-3 left-1/2 -translate-x-[50%]">
                {alert.message}
            </Alert>
        </Slide>
    )
}
