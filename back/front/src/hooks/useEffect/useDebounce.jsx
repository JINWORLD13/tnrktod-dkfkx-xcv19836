import { useEffect, useState } from "react";
export const useDebounce = (formValue={}, delay=300) => {
    const [debouncedFormValue, setDebouncedFormValue] = useState(formValue);
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedFormValue(formValue);
        }, delay)
        return ()=>{
            clearTimeout(timer);
        }
    }, [formValue, delay])
    return debouncedFormValue;
}
