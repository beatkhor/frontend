import {Route} from '@angular/router'

import {WrapperComponent} from './core/components/wrapper/wrapper.component'
import {CallbackGuard} from './core/guards/callback.guard'
import {AuthGuard} from './core/guards/auth.guard'

export const appRoutes: Route[] = [
  {
    path: 'callback',
    canActivate: [CallbackGuard],
    children: [],
  },
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication').then(m => m.AuthModule),
  },
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./modules/index').then(m => m.IndexModule),
      },
      {
        path: 'browse',
        loadChildren: () => import('./modules/browse').then(m => m.BrowseModule),
      },
      {
        path: 'upload',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/upload').then(m => m.UploadModule),
      },
      {
        path: 'page',
        loadChildren: () => import('./modules/page').then(m => m.PageModule),
      },
      {
        path: 'vote',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/vote').then(m => m.VoteModule),
      },
    ],
  },
]
