import { registerCandidatePopups } from './popups/candidate.popup';

export const candidateRoutes = [
    {
        path: '',
        loadComponent: async () => {
            const unregister = registerCandidatePopups();

            const cmp =
                await import('./candidate.page')
                    .then(m => m.CandidatePage);

            (cmp as any).ɵcmp.onDestroy = unregister;

            return cmp;
        },
    },
];
