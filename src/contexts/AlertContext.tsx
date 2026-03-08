import { createContext } from "react";
import type { AlertType } from "../types/AlertType";

interface AlertContextType {
    alert : AlertType
    setAlert : React.Dispatch<React.SetStateAction<AlertType>>
    
}

export const AlertContext = createContext<AlertContextType | null>(null)