import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {RouterModule} from '@angular/router'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'

import {LocalStorageService} from '@workspace/services/local-storage.service'
import {AuthService} from '@workspace/services/auth.service'
import {SEOService} from '@workspace/services/seo.service'

import {WrapperComponent} from './components/wrapper'
import {FooterComponent} from './components/footer'
import {NavbarComponent} from './components/navbar'

import {TokenInterceptor} from './interceptors/token-interceptor'

import {environment} from '@environments/environment'
import {ENVIRONMENT_CONFIG} from '@workspace/models'
import {SharedModule} from '@shared/shared.module'

@NgModule({
  declarations: [NavbarComponent, WrapperComponent, FooterComponent],
  imports: [SharedModule, CommonModule, HttpClientModule, RouterModule],
  providers: [
    SEOService,
    AuthService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: ENVIRONMENT_CONFIG,
      useValue: environment,
    },
  ],
  exports: [NavbarComponent, WrapperComponent],
})
export class CoreModule {}
