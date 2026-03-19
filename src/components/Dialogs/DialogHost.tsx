import { useDialogContext } from "../../hooks/useDialogContext.tsx"
import { CreateClassDialog } from "./CreateClassDialog.tsx"
import { EditClassDialog } from "./EditClassDialog.tsx"
import { JoinClassDialog } from "./JoinClassDialog.tsx"


export const DialogHost = () => {

    const { activeDialog } = useDialogContext()

    if (activeDialog === "create") {
        return <CreateClassDialog />
    } else if (activeDialog === "join") {
        return <JoinClassDialog />
    } else if (activeDialog === "edit"){
        return <EditClassDialog />
    }
    return (
        <></>
    )
}
