import {Route} from '@angular/router'

import {CallbackGuard} from './core/guards/callback.guard'

export const appRoutes: Route[] = [
  {
    path: 'callback',
    canActivate: [CallbackGuard],
    children: [],
  },
  {
    path: 'authentication',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
]
