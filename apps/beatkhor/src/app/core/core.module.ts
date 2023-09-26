import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {RouterModule} from '@angular/router'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {FooterComponent} from './components/footer'
import {WrapperComponent} from './components/wrapper'
import {NavbarComponent} from './components/navbar'

import {TokenInterceptor} from './interceptors/token-interceptor'

import {SharedModule} from '../shared/shared.module'

@NgModule({
  declarations: [NavbarComponent, WrapperComponent, FooterComponent],
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
