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
    data: {
      title: $localize`Reset password`,
      description: $localize`Now it's time to choose a new password, make sure you keep it in somewhere safe`,
    } as RouteData,
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
    data: {
      title: $localize`Sign up`,
      description: $localize`Create a beatkhor account quickly with only using your email and start publishing your beats today. Have fun listening and sharing new beats.`,
    } as RouteData,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
