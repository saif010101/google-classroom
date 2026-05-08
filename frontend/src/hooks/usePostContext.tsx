import { useContext } from "react"
import { PostContext } from "../contexts/PostContext"


export const usePostContext = () => {
    const context = useContext(PostContext)

    if (!context) {
        throw new Error("PostContext should be consumed inside the provider")
    }

    return context
}