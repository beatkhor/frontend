import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {CompleteProfileViewComponent} from './complete-profile-view'
import {ResetRequestViewComponent} from './reset-request-view'
import {SignInViewComponent} from './sign-in-view'
import {ResetViewComponent} from './reset-view'
import {SignUpComponent} from './sign-up-view'

import {AuthRoutingModule} from './auth-routing.module'
import {SharedModule} from '@shared/shared.module'

@NgModule({
  declarations: [
    SignUpComponent,
    ResetViewComponent,
    SignInViewComponent,
    ResetRequestViewComponent,
    CompleteProfileViewComponent,
  ],
  imports: [SharedModule, CommonModule, AuthRoutingModule],
})
export class AuthModule {}
