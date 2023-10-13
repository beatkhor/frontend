import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {CompleteProfileViewComponent} from './complete-profile-view'
import {ResetRequestViewComponent} from './reset-request-view'
import {SignInViewComponent} from './sign-in-view'
import {ResetViewComponent} from './reset-view'
import {SignUpComponent} from './sign-up-view'

import {AuthGuard} from '../../core/guards/auth.guard'
import {RouteData} from '@workspace/models'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
  {
    path: 'signin',
    canActivate: [AuthGuard],
    component: SignInViewComponent,
    data: {title: $localize`Sign in`} as RouteData,
  },
  {
    path: 'signup',
    canActivate: [AuthGuard],
    component: SignUpComponent,
    data: {title: $localize`Sign up`} as RouteData,
  },
  {
    path: 'complete-profile',
    canActivate: [AuthGuard],
    component: CompleteProfileViewComponent,
    data: {title: $localize`Setup your profile`} as RouteData,
  },
  {
    path: 'reset-password/request',
    component: ResetRequestViewComponent,
    data: {title: $localize`Password recovery`} as RouteData,
  },
  {
    path: 'reset-password/reset',
    component: ResetViewComponent,
    data: {title: $localize`Reset password`} as RouteData,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
