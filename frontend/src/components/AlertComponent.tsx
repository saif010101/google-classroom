import { Alert, Snackbar } from "@mui/material"
import { useAlertContext } from "../hooks/useAlertContext"

export const AlertComponent = () => {
    const { alert } = useAlertContext()

    if (alert.status === "success") {
        return (
            <Snackbar anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} open={true}>
                <Alert variant="filled" severity={"success"} className="w-full">
                    {alert.message}
                </Alert>
            </Snackbar>
        )
    } else if (alert.status === "failed") {
        return (
            <Snackbar anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} open={true}>
                <Alert variant="filled" severity={"success"} className="w-full">
                    {alert.message}
                </Alert>
            </Snackbar>
        )
    }

    return (
        <>
        </>
    )
}
