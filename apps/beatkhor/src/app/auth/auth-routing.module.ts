import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'

import {ResetRequestComponent} from './auth-reset-request.component'
import {SignInComponent} from './auth-sign-in.component'
import {SignUpComponent} from './auth-sign-up.component'
import {ResetComponent} from './auth-reset.component'
import {AuthGuard} from '../core/guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
  {
    path: 'signin',
    canActivate: [AuthGuard],
    component: SignInComponent,
  },
  {
    path: 'signup',
    canActivate: [AuthGuard],
    component: SignUpComponent,
  },
  {
    path: 'reset-password/request',
    component: ResetRequestComponent,
  },
  {
    path: 'reset-password/reset',
    component: ResetComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
