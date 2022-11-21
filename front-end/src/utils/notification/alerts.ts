import {toast} from "react-toastify";

export const notify = (status: 'warning' | 'success' | 'info' | 'error' | 'default', text: string) => {
    // @ts-ignore
    toast[status](text)
}

export const notifyPromise = (promise: any) => {
    toast.promise(
        promise,
        {
            pending: {
                render() {
                    return 'Loading...'
                }
            },
            error: {
                render() {
                    return 'Something went wrong'
                }
            },
            success: {
                render() {
                    return 'Success'
                }
            }
        }
    )
}

export const notifyUpdate = (toastVar: any, render = 'Success', type: 'success' | 'error', isLoading = false, autoClose = 1000) => {
    toast.update(toastVar, {render, type, isLoading, autoClose})
}