export interface CandidatePopupMap {
    'candidate.edit': {
        data: { id: number; name: string };
        result: CandidateEditResult
    };
    'candidate.add': {
        data?: undefined;
        result: CandidateAddResult;
    };
}

import { PopupRegistry } from '@angular-starter/ui/popup';
import { inject } from '@angular/core';
import { CandidateAddResult } from './candidate-add.dialog';
import { CandidateEditResult } from './candidate-edit.dialog';

export function registerCandidatePopups() {
    const registry =
        inject(PopupRegistry<CandidatePopupMap>);

    const unregisterEdit = registry.register(
        'candidate.edit',
        () =>
            import('./candidate-edit.dialog')
                .then(m => m.CandidateEditPopup),
        {
            onOpen: data =>
                console.log('Open edit candidate', data),
            onClose: result =>
                console.log('Closed with', result),
        }
    );
    const unregisterAdd = registry.register(
        'candidate.add',
        () =>
            import('./candidate-add.dialog')
                .then(m => m.CandidateAddPopup)
    );

    return () => {
        unregisterEdit();
        unregisterAdd();
    };
}
