import { createContext } from "react";
import type { UserData } from "../types/UserData.ts";
import { useUserData } from "../hooks/useUserData.tsx";
import type { PropsWithChildren } from "react";

interface AuthContextShape {
    user: UserData | null
    isError: boolean,
    isPending: boolean,
    refetch: () => void
}

export const AuthContext = createContext<AuthContextShape | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const { data, isError, isPending, refetch } = useUserData()
    return (
        <AuthContext.Provider value={{ user: data ?? null, isError, isPending, refetch }}>
            {children}
        </AuthContext.Provider >
    )
}