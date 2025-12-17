import { PopupRegistry } from '@angular-starter/ui/popup';
import { inject } from '@angular/core';
import { ConfirmPopupData, ConfirmPopupResult } from './confirm.types';

export interface SharedPopupMap {
    'ui.confirm': {
        data: ConfirmPopupData;
        result: ConfirmPopupResult;
    };
}

export function registerConfirmPopup() {
    const registry =
        inject(PopupRegistry<SharedPopupMap>);

    return registry.register(
        'ui.confirm',
        () =>
            import('./confirm.dialog')
                .then(m => m.ConfirmDialog)
    );
}
