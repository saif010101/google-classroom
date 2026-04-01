import { useDialogContext } from "../../hooks/useDialogContext.tsx"
import { CreateClassDialog } from "./CreateClassDialog.tsx"
import { CreatePostDialog } from "./CreatePostDialog.tsx"
import { EditClassDialog } from "./EditClassDialog.tsx"
import { JoinClassDialog } from "./JoinClassDialog.tsx"


export const DialogHost = () => {

    const { activeDialog } = useDialogContext()

    if (activeDialog === "create-class") {
        return <CreateClassDialog />
    } else if (activeDialog === "join-class") {
        return <JoinClassDialog />
    } else if (activeDialog === "edit-class") {
        return <EditClassDialog />
    } else if (activeDialog === "create-post") {
        return <CreatePostDialog />
    }
    return (
        <CreatePostDialog />
    )
}
