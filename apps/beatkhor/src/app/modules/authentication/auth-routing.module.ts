import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {CompleteProfileViewComponent} from './complete-profile-view'
import {ResetRequestViewComponent} from './reset-request-view'
import {SignInViewComponent} from './sign-in-view'
import {ResetViewComponent} from './reset-view'
import {SignUpComponent} from './sign-up-view'

import {AuthGuard} from '../../core/guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
  {
    path: 'complete-profile',
    canActivate: [AuthGuard],
    component: CompleteProfileViewComponent,
  },
  {
    path: 'reset-password/request',
    component: ResetRequestViewComponent,
  },
  {
    path: 'reset-password/reset',
    component: ResetViewComponent,
  },
  {
    path: 'signin',
    canActivate: [AuthGuard],
    component: SignInViewComponent,
  },
  {
    path: 'signup',
    canActivate: [AuthGuard],
    component: SignUpComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
