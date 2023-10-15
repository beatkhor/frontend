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
    data: {
      title: $localize`Sign in`,
      description: $localize`Sign into your beatkhor account and start publishing your beats today. Have fun listening and sharing new beats.`,
    } as RouteData,
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
  {
    path: 'complete-profile',
    canActivate: [AuthGuard],
    component: CompleteProfileViewComponent,
    data: {
      title: $localize`Setup your profile`,
      description: $localize`Add more information to your profile and choose a nick name for yourself`,
    } as RouteData,
  },
  {
    path: 'reset-password/request',
    component: ResetRequestViewComponent,
    data: {
      title: $localize`Password recovery`,
      description: $localize`Don't worry if you have forgotten your password. Just enter your email and receive the instruction for choosing a new password`,
    } as RouteData,
  },
  {
    path: 'reset-password/reset',
    component: ResetViewComponent,
    data: {
      title: $localize`Reset password`,
      description: $localize`Now it's time to choose a new password, make sure you keep it in somewhere safe`,
    } as RouteData,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
