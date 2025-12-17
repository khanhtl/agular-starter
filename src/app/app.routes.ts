import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'candidates',
        loadChildren: () =>
            import('@angular-starter/feature/candidate')
                .then(m => m.candidateRoutes),
    },

    { path: '', redirectTo: 'candidates', pathMatch: 'full' },
];
