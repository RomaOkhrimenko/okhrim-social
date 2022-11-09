import {toast} from "react-toastify";

export const notify = (status: 'warning' | 'success' | 'info' | 'error' | 'default', text: string) => {
    // @ts-ignore
    toast[status](text)
}