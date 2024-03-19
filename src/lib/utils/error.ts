import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';



export function showErrorToast(message: string) {
    const toastStore = getToastStore();
    const error: ToastSettings = {
        message,
        background: 'variant-filled-error',
    } 
    toastStore.trigger(error);
}