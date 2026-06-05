import { Alert, Slide, Snackbar } from "@mui/material"
import { useAlertContext } from "../hooks/useAlertContext"

export const AlertComponent = () => {
    const { alert, setAlert } = useAlertContext()

    const handleClose = () => {
        setAlert({
            status: "close",
            message: ""
        })
    }

    return (<>
        {alert.status !== 'close' &&
            <Snackbar open={true} autoHideDuration={3000} onClose={handleClose} slots={{ transition: Slide }}>
                <Alert
                    severity={alert.status}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        }
    </>

    )
}
