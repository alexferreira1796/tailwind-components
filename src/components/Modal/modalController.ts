import { useEffect, useState } from "react";
import { ModalControllerProps } from "./types";

export const useModalController = ({id}: ModalControllerProps) => {
    const [item, setItem] = useState<string | null>(null);

    useEffect(() => {
        setItem(id ?? null)
    }, [id]);
    
    return {
        item,
    }
}

export default useModalController;