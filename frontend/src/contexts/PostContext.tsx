import { createContext } from "react";

export interface CurrentPostInfo {
    post_id : number
    content : string
}

interface PostContextType {
    currentPost : CurrentPostInfo | undefined
    setCurrentPost : React.Dispatch<React.SetStateAction<CurrentPostInfo | undefined>>
}

export const PostContext = createContext<PostContextType | undefined>(undefined)