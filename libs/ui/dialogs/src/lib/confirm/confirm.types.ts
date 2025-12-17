export interface ConfirmPopupData {
    title?: string;
    message: string;
    okText?: string;
    cancelText?: string;
}

export type ConfirmPopupResult =
    | { confirmed: true }
    | { confirmed: false };
