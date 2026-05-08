import { useEffect, type RefObject } from "react"

export const useClickOutside = (ref: RefObject<HTMLDivElement | null>, callback: () => void) => {

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // If the ref exists and the clicked element is NOT inside the ref
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Unbind the event listener on clean up
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
