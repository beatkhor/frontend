import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {ResetRequestComponent} from './auth-reset-request.component'
import {SignInComponent} from './auth-sign-in.component'
import {SignUpComponent} from './auth-sign-up.component'
import {AuthRoutingModule} from './auth-routing.module'
import {ResetComponent} from './auth-reset.component'
import {SharedModule} from '../shared/shared.module'

@NgModule({
  declarations: [SignInComponent, SignUpComponent, ResetRequestComponent, ResetComponent],
  imports: [SharedModule, CommonModule, AuthRoutingModule],
})
export class AuthModule {}
