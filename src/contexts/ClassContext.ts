import { createContext } from "react";

export interface CurrentClassInfo {
    name: string
    section: string
}

interface ClassContextType {
    currentClass : CurrentClassInfo | undefined
    setCurrentClass : React.Dispatch<React.SetStateAction<CurrentClassInfo | undefined>>
}

export const ClassContext = createContext<ClassContextType | undefined>(undefined)