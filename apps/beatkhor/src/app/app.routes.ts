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
      {
        path: 'upload',
        canActivate: [AuthGuard],
        loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule),
      },
      {
        path: 'vote',
        canActivate: [AuthGuard],
        loadChildren: () => import('./vote/vote.module').then(m => m.VoteModule),
      },
      {
        path: 'browse',
        loadChildren: () => import('./browse/browse.module').then(m => m.BrowseModule),
      },
      {
        path: 'page',
        loadChildren: () => import('./page/page.module').then(m => m.PageModule),
      },
    ],
  },
]
