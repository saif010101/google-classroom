import { Alert, Snackbar } from "@mui/material"
import { useAlertContext } from "../hooks/useAlertContext"

export const AlertComponent = () => {
    const { alert } = useAlertContext()
    return (
        <Snackbar anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} open={alert.status !== "pending"}>
            {alert.status === "success" ?
            <Alert variant="filled" severity={"success"} className="w-full">{alert.message}</Alert> :
            <Alert variant="filled" severity={"error"} className="w-full"> {alert.message} </Alert>
            }
        </Snackbar>
    )
}
