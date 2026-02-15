import { useDialogContext } from "../../hooks/useDialogContext.tsx"
import { CreateClassDialog } from "./CreateClassDialog.tsx"
import { JoinClassDialog } from "./JoinClassDialog.tsx"


export const DialogHost = () => {

    const { activeDialog } = useDialogContext()
    return (
        activeDialog === "create" ? <CreateClassDialog /> : <JoinClassDialog />
    )
}
