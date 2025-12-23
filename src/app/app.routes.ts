import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'button',
        loadComponent: () => import('./pages/button-demo/button-demo.component').then(m => m.ButtonDemoComponent)
    },
    {
        path: 'grid',
        loadComponent: () => import('./pages/grid-demo/grid-demo.component').then(m => m.GridDemoComponent)
    },
    {
        path: 'candidates',
        loadChildren: () =>
            import('@angular-starter/feature/candidate')
                .then(m => m.candidateRoutes),
    },

    { path: '', redirectTo: 'button', pathMatch: 'full' },
];
