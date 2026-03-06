import { createContext } from "react";

type alertType = "success" | "failed" | null
interface AlertContextType {
    alert : alertType
    setAlert : React.Dispatch<React.SetStateAction<alertType>>
}

export const AlertContext = createContext<AlertContextType | null>(null)