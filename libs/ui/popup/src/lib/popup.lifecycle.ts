export interface PopupLifecycle<TData = unknown, TResult = unknown> {
    onOpen?: (data?: TData) => void;
    onClose?: (result?: TResult) => void;
}
