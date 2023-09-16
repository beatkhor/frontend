import {Route} from '@angular/router'

import {WrapperComponent} from './core/components/wrapper.component'
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
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./index/index.module').then(m => m.IndexModule),
      },
    ],
  },
]
