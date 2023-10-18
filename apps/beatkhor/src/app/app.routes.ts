import {Route} from '@angular/router'

import {WrapperComponent} from './core/components/wrapper/wrapper.component'
import {CallbackGuard} from './core/guards/callback.guard'
import {AuthGuard} from './core/guards/auth.guard'
import {RouteData} from '@workspace/models'

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
        data: {
          title: $localize`Browse`,
          description: $localize`Explore hundreds of high-quality beats with various genres and unique attributes on Beatkhor. Find the perfect sound for your music production and projects.`,
        } as RouteData,
      },
      {
        path: 'upload',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/upload').then(m => m.UploadModule),
        data: {
          title: $localize`Upload`,
          description: $localize`Share your creativity with the world! Upload your new beats to Beatkhor and showcase your music to a global audience. Connect with fellow artists and producers. Start sharing your musical journey today.`,
        } as RouteData,
      },
      {
        path: 'page',
        loadChildren: () => import('./modules/page').then(m => m.PageModule),
      },
      {
        path: 'vote',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/vote').then(m => m.VoteModule),
        data: {
          title: $localize`Review tracks`,
          description: $localize`Discover and influence the future of music! Review and vote on beats at Beatkhor. Your feedback matters – help decide which beats get published and shape the sound of tomorrow.`,
        } as RouteData,
      },
    ],
  },
]
