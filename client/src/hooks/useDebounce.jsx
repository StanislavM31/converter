import {useCallback, useRef} from "react";
// в планах повесить это на onChange в Input
export default function useDebounce(callback, delay) {
    const timer = useRef();

    const debouncedCallback = useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])

    return debouncedCallback;
};