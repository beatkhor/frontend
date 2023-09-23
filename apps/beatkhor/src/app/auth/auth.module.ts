import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {CompleteProfileViewComponent} from './complete-profile-view'
import {ResetRequestViewComponent} from './reset-request-view'
import {SignInComponent} from './auth-sign-in.component'
import {SignUpComponent} from './auth-sign-up.component'
import {AuthRoutingModule} from './auth-routing.module'
import {ResetViewComponent} from './reset-view'
import {SharedModule} from '../shared/shared.module'

@NgModule({
  declarations: [
    ResetViewComponent,
    SignInComponent,
    SignUpComponent,
    ResetRequestViewComponent,
    CompleteProfileViewComponent,
  ],
  imports: [SharedModule, CommonModule, AuthRoutingModule],
})
export class AuthModule {}
