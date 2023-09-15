import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {RouterModule} from '@angular/router'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {TokenInterceptor} from './interceptors/token-interceptor'
import {WrapperComponent} from './components/wrapper.component'
import {NavbarComponent} from './components/navbar.component'
import {SharedModule} from '../shared/shared.module'

@NgModule({
  declarations: [NavbarComponent, WrapperComponent],
  imports: [SharedModule, CommonModule, HttpClientModule, RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  exports: [NavbarComponent, WrapperComponent],
})
export class CoreModule {}
